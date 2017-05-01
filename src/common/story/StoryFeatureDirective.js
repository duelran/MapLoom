(function() {

  var module = angular.module('loom_story_feature_directive', []);

  module.directive('loomStoryFeature',
      function(featureManagerService, mapService, $rootScope, $http, $q) {
        return {
          replace: true,
          scope: {
          },
          templateUrl: 'story/partials/storyfeature.tpl.html',
          link: function(scope, element, attrs) {
            scope.feature = {
              props: {}
            };

            scope.$watch(featureManagerService.getSelectedItem, function(item) {
              if (item && item.properties) {
                scope.feature.props = item.properties;
                mapService.story.selectedFeature = item.id;
              } else if (mapService.story.selectedFeature !== undefined) {
                mapService.story.selectedFeature = undefined;
                scope.feature.props = undefined;
              }
            });

            mapService.map.once('postrender', function() {
              $q.when(mapService.story.ready, function() {
                $http.get('/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=json&featureID=' + mapService.story.selectedFeature).success(
                    function(data) {
                      var reader = new ol.format.GeoJSON();
                      try {
                        var feature = reader.readFeaturesFromObject(data);
                        var copy = feature[0].getProperties();
                        delete copy[feature[0]['geometryName_']];
                        scope.feature.props = copy;
                      } catch (e) {
                        //Exception is thrown when feature doesn't exist in the wfs endpoint
                      }
                    }
                );
              });
            });
          }
        };
      }
  );
})();
