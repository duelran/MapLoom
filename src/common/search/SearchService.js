(function() {
  var module = angular.module('loom_search_service', []);

  var httpService_ = null;
  var q_ = null;
  var configService_ = null;
  var mapService_ = null;
  var searchlayer_ = null;

  module.provider('searchService', function() {
    this.$get = function($rootScope, $http, $q, $translate, configService, mapService) {
      httpService_ = $http;
      q_ = $q;
      configService_ = configService;
      mapService_ = mapService;

      searchlayer_ = new ol.layer.Vector({
        metadata: {
          title: $translate.instant('search_results'),
          internalLayer: true
        },
        source: new ol.source.Vector({
          parser: null
        }),
        style: function(feature, resolution) {
          return [new ol.style.Style({
            image: new ol.style.Circle({
              radius: 8,
              fill: new ol.style.Fill({
                color: '#D6AF38'
              }),
              stroke: new ol.style.Stroke({
                color: '#000000'
              })
            })
          })];
        }
      });

      $rootScope.$on('translation_change', function() {
        searchlayer_.get('metadata').title = $translate.instant('search');
      });

      return this;
    };

    // Keeping it here so it's easier to merge master into the ps/era branch in the future
    var era_search_enabled = true;
    if (era_search_enabled === true) {
      this.performSearch = function(searchTerm) {
        //Given a layerName and the propertyName, generates the url string to make the wfs feature search for the searchTerm
        function generateURL(layerName, propertyName) {
          return '/geoserver/geonode/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=' + layerName +
              "&maxFeatures=50&filter=<Filter><PropertyIsLike wildCard='*' singleChar='.' escape='!'><PropertyName>" + propertyName +
              '</PropertyName><Literal>*' +
              searchTerm.toUpperCase() + '*</Literal></PropertyIsLike></Filter>';
        }

        function convertResponseIntoResults(response) {
          if (goog.isDefAndNotNull(response.data) && goog.isArray(response.data.features)) {
            var results = [];
            forEachArrayish(response.data.features, function(result) {
              results.push({
                location: result.geometry.coordinates,
                boundingbox: [+result.geometry.coordinates[1] - 0.3, +result.geometry.coordinates[1] + 0.3, +result.geometry.coordinates[0] - 0.1, +result.geometry.coordinates[0] + 0.1],
                name: result.properties.TITLE
              });
            });
            return results;
          } else {
            return [];
          }
        }

        //Generate a url for BASES, AIR, and CHECK
        //On all promises returning ($q.all([])), parse them all into a single list, sort by tailnumber, resolve the returned promise
        var bases = httpService_.get(generateURL('geonode:ERAMAP_BASES_MV', 'LOCATION_NAME')).then(convertResponseIntoResults);
        var air = httpService_.get(generateURL('geonode:ERAMAP_AIRCRAFT_AIR_MV', 'ASSET_NAME')).then(convertResponseIntoResults);
        var check = httpService_.get(generateURL('geonode:ERAMAP_AIRCRAFT_CHECK_MV', 'ASSET_NAME')).then(convertResponseIntoResults);

        return q_.all([bases, air, check]).then(function(results) {
          var unsortedArray = [];
          forEachArrayish(results, function(arr) {
            unsortedArray = unsortedArray.concat(arr);
          });
          //Sort by display names
          return unsortedArray.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        });
      };
    } else {
      // algorithm taken from http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates#Java
      // from the "Boundingcoordinates" method
      convertLatLonToBbox = function(coordinates) {
        // This is the distance in km of the radius of the "greater circle"
        // that is, distance to an imagined point at the edge of our view
        // unit is in km
        var distanceKM = 2;
        // Setting the radius to an approximation of the world's radius in km
        var radiusKM = 6371.01;

        var distanceRadians = distanceKM / radiusKM;

        var radLat = coordinates[1] * (Math.PI / 180);
        var radLon = coordinates[0] * (Math.PI / 180);
        var minLat = radLat - distanceRadians;
        var maxLat = radLat + distanceRadians;

        var minLon, maxLon;
        var MIN_LAT = -Math.PI / 2;
        var MAX_LAT = Math.PI / 2;
        var MIN_LON = -Math.PI;
        var MAX_LON = Math.PI;

        if (minLat > MIN_LAT && maxLat < MAX_LAT) {
          var deltaLon = Math.asin(Math.sin(distanceRadians) / Math.cos(radLat));
          minLon = radLon - deltaLon;
          if (minLon < MIN_LON) {
            minLon += Math.PI * 2;
          }
          maxLon = radLon + deltaLon;
          if (maxLon > MAX_LON) {
            maxLon -= Math.PI * 2;
          }
        } else {
          // a pole is within the distance
          minLat = Math.max(minLat, MIN_LAT);
          maxLat = Math.min(maxLat, MAX_LAT);
          minLon = MIN_LON;
          maxLon = MAX_LON;
        }
        // convert back to degrees
        minLat = minLat * (180 / Math.PI);
        minLon = minLon * (180 / Math.PI);
        maxLat = maxLat * (180 / Math.PI);
        maxLon = maxLon * (180 / Math.PI);
        return [minLat, maxLat, minLon, maxLon];
      };

      this.performSearch = function(address) {
        var currentView = mapService_.map.getView().calculateExtent([$(window).height(), $(window).width()]);
        var minBox = ol.proj.transform([currentView[0], currentView[1]],
            mapService_.map.getView().getProjection(), 'EPSG:4326');
        var maxBox = ol.proj.transform([currentView[2], currentView[3]],
            mapService_.map.getView().getProjection(), 'EPSG:4326');
        currentView[0] = minBox[0];
        currentView[1] = minBox[1];
        currentView[2] = maxBox[0];
        currentView[3] = maxBox[1];
        var promise = q_.defer();
        var url;

        // Check which to handle
        if (configService_.configuration.nominatimSearchEnabled === true) {
          var nominatimUrl = configService_.configuration.searchUrl;
          if (nominatimUrl.substr(nominatimUrl.length - 1) === '/') {
            nominatimUrl = nominatimUrl.substr(0, nominatimUrl.length - 1);
          }
          httpService_({
            method: 'GET',
            url: nominatimUrl,
            params: {
              q: address,
              format: 'json',
              limit: 30,
              viewobxlbrt: currentView.toString()
            }
          }).then(function(response) {
            if (goog.isDefAndNotNull(response.data) && goog.isArray(response.data)) {
              var results = [];
              forEachArrayish(response.data, function(result) {
                var bbox = result.boundingbox;
                for (var i = 0; i < bbox.length; i++) {
                  bbox[i] = parseFloat(bbox[i]);
                }
                results.push({
                  location: [parseFloat(result.lon), parseFloat(result.lat)],
                  boundingbox: bbox,
                  name: result.display_name
                });
              });
              promise.resolve(results);
            } else {
              promise.reject(response.status);
            }
          }, function(reject) {
            promise.reject(reject.status);
          });
        } else if (configService_.configuration.geoquerySearchEnabled === true) {
          var geoqueryUrl = configService_.configuration.searchUrl;
          if (geoqueryUrl.substr(geoqueryUrl.length - 1) === '/') {
            geoqueryUrl = geoqueryUrl.substr(0, geoqueryUrl.length - 1);
          }
          httpService_({
            method: 'GET',
            url: geoqueryUrl + '/wfs',
            params: {
              request: 'GetFeature',
              service: 'WFS',
              version: '1.1.0',
              typename: 'all',
              filter: '<PropertyIsEqualTo><PropertyName>query</PropertyName><Literal>' +
                  address + '</Literal></PropertyIsEqualTo>',
              bbox: currentView.toString(),
              outputFormat: 'json'
            }
          }).then(function(response) {
            if (goog.isDefAndNotNull(response.data.features) && goog.isArray(response.data.features)) {
              var results = [];
              forEachArrayish(response.data.features, function(result) {
                results.push({
                  location: [parseFloat(result.geometry.coordinates[0]), parseFloat(result.geometry.coordinates[1])],
                  boundingbox: convertLatLonToBbox(result.geometry.coordinates),
                  // In the future we want to add another property and have it pull right and be smaller text
                  name: result.properties.name + '(' + result.properties.featureDesignationName + ')'
                });
              });
              promise.resolve(results);
            } else {
              promise.reject(response.status);
            }
          }, function(reject) {
            promise.reject(reject.status);
          });
        } else {
          // default to using osm method
          var searchUrl = configService_.configuration.searchUrl;
          if (searchUrl.substr(searchUrl.length - 1) === '/') {
            searchUrl = searchUrl.substr(0, searchUrl.length - 1);
          }
          httpService_({
            method: 'GET',
            url: searchUrl,
            params: {
              q: address,
              format: 'json',
              limit: 30,
              viewobxlbrt: currentView.toString()
            }
          }).then(function(response) {
            if (goog.isDefAndNotNull(response.data) && goog.isArray(response.data)) {
              var results = [];
              forEachArrayish(response.data, function(result) {
                var bbox = result.boundingbox;
                for (var i = 0; i < bbox.length; i++) {
                  bbox[i] = parseFloat(bbox[i]);
                }
                results.push({
                  location: [parseFloat(result.lon), parseFloat(result.lat)],
                  boundingbox: bbox,
                  name: result.display_name
                });
              });
              promise.resolve(results);
            } else {
              promise.reject(response.status);
            }
          }, function(reject) {
            promise.reject(reject.status);
          });
        }

        return promise.promise;
      };
    }

    this.populateSearchLayer = function(results) {
      searchlayer_.getSource().clear();
      mapService_.map.removeLayer(searchlayer_);
      mapService_.map.addLayer(searchlayer_);
      forEachArrayish(results, function(result) {
        var olFeature = new ol.Feature();
        olFeature.setGeometry(new ol.geom.Point(ol.proj.transform(result.location, 'EPSG:4326',
            mapService_.map.getView().getProjection())));
        searchlayer_.getSource().addFeature(olFeature);
      });
    };

    this.clearSearchLayer = function() {
      searchlayer_.getSource().clear();
      mapService_.map.removeLayer(searchlayer_);
    };
  });
}());
