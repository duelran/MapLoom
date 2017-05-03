(function() {
  var module = angular.module('loom_layer_attribute_visibility_directive', []);

  module.directive('loomLayerAttributeVisibility',
      function($translate, serverService, geogigService) {
        return {
          templateUrl: 'layers/partials/layerattributevisibility.tpl.html',
          link: function(scope, element) {
            var resetVariables = function() {
              scope.layer = null;
            };
            resetVariables();
            scope.$on('getLayerAttributeVisibility', function(evt, layer) {
              //resetVariables();
              scope.layer = layer;
              scope.getAttrList = function(layer) {
                var attrList = [];

                for (var i in layer.get('metadata').schema) {
                  if (layer.get('metadata').schema[i]._type.search('gml:') > -1) {
                    continue;
                  }
                  attrList.push(layer.get('metadata').schema[i]);
                }

                if (goog.isDefAndNotNull(layer) && goog.isDefAndNotNull(layer.get('exchangeMetadata')) &&
                    goog.isDefAndNotNull(layer.get('exchangeMetadata').attributes)) {
                  attrList = _.sortBy(attrList, function(attr) {
                    return _.find(layer.get('exchangeMetadata').attributes, { 'attribute': attr._name }).display_order;
                  });
                }
                return attrList;
              };
              scope.toggleAttributeVisibility = function(attribute) {
                attribute.visible = !attribute.visible;
              };

              scope.isAttributeVisible = function(property) {
                var exchangeMetadataAttribute = getExchangeMetadataAttribute(property);

                if (goog.isDefAndNotNull(exchangeMetadataAttribute) &&
                    goog.isDefAndNotNull(exchangeMetadataAttribute.visible)) {
                  return exchangeMetadataAttribute.visible;
                }

                return true;
              };

              scope.getAttributeLabel = function(property) {
                var exchangeMetadataAttribute = getExchangeMetadataAttribute(property);

                if (goog.isDefAndNotNull(exchangeMetadataAttribute) &&
                    goog.isDefAndNotNull(exchangeMetadataAttribute.attribute_label) &&
                    exchangeMetadataAttribute.attribute_label.length > 0) {
                  return exchangeMetadataAttribute.attribute_label;
                }

                return property;
              };

              function getExchangeMetadataAttribute(property) {
                var exchangeMetadata = scope.layer.get('exchangeMetadata');

                if (goog.isDefAndNotNull(exchangeMetadata) && goog.isDefAndNotNull(exchangeMetadata.attributes)) {
                  for (var index in exchangeMetadata.attributes) {
                    if (goog.isDefAndNotNull(exchangeMetadata.attributes[index]) &&
                        exchangeMetadata.attributes[index].attribute === property) {
                      return exchangeMetadata.attributes[index];
                    }
                  }
                }

                return null;
              }

              element.closest('.modal').modal('toggle');
            });
            function onResize() {
              var height = $(window).height();
              element.children('.modal-body').css('max-height', (height - 200).toString() + 'px');
            }

            onResize();

            $(window).resize(onResize);
          }
        };
      });
}());
