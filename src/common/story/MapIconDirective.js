(function() {

  var module = angular.module('loom_map_icon_directive', []);

  module.directive('loomMapIcon',
      function() {
        return {
          replace: true,
          templateUrl: 'story/partials/mapicon.tpl.html',
          link: function(scope, element, attrs) {
            $('#logo-upload').on('change', function(e) {
              var file = $('#logo-upload')[0].files[0];
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function() {
                $('#logo').attr('src', reader.result);
              };
            });
            $('#logo').click(function() {
              $('#logo-upload').trigger('click');
            });
          }
        };
      }
  );
})();
