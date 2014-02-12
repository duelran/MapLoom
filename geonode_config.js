var conf = {
  'authStatus':200,
  'username':'admin',
  'userprofilename':'bobby',
  'userprofileemail':'bobby@bob.com',
  'proxy':'/proxy/?url=',
  'nominatimUrl':'http://nominatim.openstreetmap.org',
  'printService':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/pdf/',
  'rest':'/maps/',
  'ajaxLoginUrl':'/account/ajax_login',
  'homeUrl':'/',
  'portalItems':[
    {
      'xtype':'container',
      'layout':'fit',
      'height':81,
      'region':'north'
    }
  ],
  'localGeoServerBaseUrl':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/',
  'localCSWBaseUrl':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw',
  'csrfToken':'au2a6uZO9A42lmsYLOGwkhUfgLFJxgY2',
  'tools':[
    {
      'ptype':'gxp_getfeedfeatureinfo'
    }
  ],
  'defaultSourceType':'gxp_wmscsource',
  'about':{
    'abstract':'',
    'title':'OD1'
  },
  'map':{
    'layers':[
      {
        'opacity':1,
        'args':[
          'No background'
        ],
        'group':'background',
        'name':'No background',
        'title':'No background',
        'selected':false,
        'visibility':false,
        'source':'0',
        'fixed':true,
        'type':'OpenLayers.Layer'
      },
      {
        'opacity':1,
        'args':[
          'OpenStreetMap'
        ],
        'group':'background',
        'name':'OpenStreetMap',
        'title':'OpenStreetMap',
        'selected':false,
        'visibility':false,
        'source':'0',
        'fixed':true,
        'type':'OpenLayers.Layer.OSM'
      },
      {
        'opacity':1,
        'group':'background',
        'name':'osm',
        'title':'MapQuest OpenStreetMap',
        'selected':false,
        'visibility':true,
        'source':'1',
        'fixed':true
      },
      {
        'opacity':1,
        'group':'background',
        'name':'naip',
        'title':'MapQuest Imagery',
        'selected':false,
        'visibility':false,
        'source':'1',
        'fixed':true
      },
      {
        'opacity':1,
        'args':[
          'bluemarble',
          'http://maps.opengeo.org/geowebcache/service/wms',
          {
            'layers':[
              'bluemarble'
            ],
            'tiled':true,
            'tilesOrigin':[
              -20037508.34,
              -20037508.34
            ],
            'format':'image/png'
          },
          {
            'buffer':0
          }
        ],
        'group':'background',
        'name':'bluemarble',
        'title':'bluemarble',
        'selected':false,
        'visibility':false,
        'source':'0',
        'fixed':true,
        'type':'OpenLayers.Layer.WMS'
      },
      {
        'opacity':1,
        'name':'geonode:estaciones_temporales_de_primeros_auxilios',
        'format':'image/png',
        'cached':true,
        'selected':false,
        'visibility':true,
        'capability':{
          'abstract':'No abstract provided',
          'nestedLayers':[

          ],
          'cascaded':0,
          'fixedHeight':0,
          'prefix':'geonode',
          'keywords':[

          ],
          'noSubsets':false,
          'dimensions':{

          },
          'opaque':false,
          'infoFormats':[
            'text/plain',
            'application/vnd.ogc.gml',
            'application/vnd.ogc.gml/3.1.1',
            'text/html',
            'application/json'
          ],
          'styles':[
            {
              'abstract':'',
              'title':'',
              'legend':{
                'height':'20',
                'width':'20',
                'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/wms?request=Ge…%2Fpng&width=20&height=20&layer=estaciones_temporales_de_primeros_auxilios',
                'format':'image/png'
              },
              'name':'estaciones_temporales_de_primeros_auxilios'
            }
          ],
          'attribution':{
            'title':'admin'
          },
          'authorityURLs':{

          },
          'bbox':{
            'EPSG:4326':{
              'srs':'EPSG:4326',
              'bbox':[
                -121.4727099651595,
                13.377182634851891,
                -82.61305278735648,
                32.86114429745853
              ]
            }
          },
          'fixedWidth':0,
          'metadataURLs':[
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=24ad7ac3-df59-4a61-b09a-836a27d96b9e',
              'type':'FGDC',
              'format':'text/xml'
            },
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=24ad7ac3-df59-4a61-b09a-836a27d96b9e',
              'type':'TC211',
              'format':'text/xml'
            }
          ],
          'name':'geonode:estaciones_temporales_de_primeros_auxilios',
          'identifiers':{

          },
          'srs':{
            'EPSG:900913':true
          },
          'formats':[
            'image/png',
            'application/atom xml',
            'application/atom+xml',
            'application/openlayers',
            'application/pdf',
            'application/rss xml',
            'application/rss+xml',
            'application/vnd.google-earth.kml',
            'application/vnd.google-earth.kml xml',
            'application/vnd.google-earth.kml+xml',
            'application/vnd.google-earth.kml+xml;mode=networklink',
            'application/vnd.google-earth.kmz',
            'application/vnd.google-earth.kmz xml',
            'application/vnd.google-earth.kmz+xml',
            'application/vnd.google-earth.kmz;mode=networklink',
            'atom',
            'image/geotiff',
            'image/geotiff8',
            'image/gif',
            'image/gif;subtype=animated',
            'image/jpeg',
            'image/png8',
            'image/png; mode=8bit',
            'image/svg',
            'image/svg xml',
            'image/svg+xml',
            'image/tiff',
            'image/tiff8',
            'kml',
            'kmz',
            'openlayers',
            'rss'
          ],
          'title':'estaciones_temporales_de_primeros_auxilios',
          'queryable':true,
          'llbbox':[
            -121.4727099651595,
            13.377182634851891,
            -82.61305278735648,
            32.86114429745853
          ]
        },
        'source':'2',
        'tiled':true,
        'title':'estaciones_temporales_de_primeros_auxilios',
        'fixed':false,
        'transparent':true
      },
      {
        'opacity':1,
        'name':'geonode:incidentes_copeco',
        'format':'image/png',
        'cached':true,
        'selected':false,
        'visibility':true,
        'capability':{
          'abstract':'No abstract provided',
          'nestedLayers':[

          ],
          'cascaded':0,
          'fixedHeight':0,
          'prefix':'geonode',
          'keywords':[

          ],
          'noSubsets':false,
          'dimensions':{

          },
          'opaque':false,
          'infoFormats':[
            'text/plain',
            'application/vnd.ogc.gml',
            'application/vnd.ogc.gml/3.1.1',
            'text/html',
            'application/json'
          ],
          'styles':[
            {
              'abstract':'',
              'title':'',
              'legend':{
                'height':'20',
                'width':'20',
                'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/wms?request=Ge…egendGraphic&format=image%2Fpng&width=20&height=20&layer=incidentes_copeco',
                'format':'image/png'
              },
              'name':'incidentes_copeco'
            }
          ],
          'attribution':{
            'title':'admin'
          },
          'authorityURLs':{

          },
          'bbox':{
            'EPSG:4326':{
              'srs':'EPSG:4326',
              'bbox':[
                -91.02745345567851,
                13.377182634851891,
                -84.25438216661354,
                15.520765886648507
              ]
            }
          },
          'fixedWidth':0,
          'metadataURLs':[
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=1bf7e5bc-e3be-4a44-bc2a-d6ff96d815e7',
              'type':'FGDC',
              'format':'text/xml'
            },
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=1bf7e5bc-e3be-4a44-bc2a-d6ff96d815e7',
              'type':'TC211',
              'format':'text/xml'
            }
          ],
          'name':'geonode:incidentes_copeco',
          'identifiers':{

          },
          'srs':{
            'EPSG:900913':true
          },
          'formats':[
            'image/png',
            'application/atom xml',
            'application/atom+xml',
            'application/openlayers',
            'application/pdf',
            'application/rss xml',
            'application/rss+xml',
            'application/vnd.google-earth.kml',
            'application/vnd.google-earth.kml xml',
            'application/vnd.google-earth.kml+xml',
            'application/vnd.google-earth.kml+xml;mode=networklink',
            'application/vnd.google-earth.kmz',
            'application/vnd.google-earth.kmz xml',
            'application/vnd.google-earth.kmz+xml',
            'application/vnd.google-earth.kmz;mode=networklink',
            'atom',
            'image/geotiff',
            'image/geotiff8',
            'image/gif',
            'image/gif;subtype=animated',
            'image/jpeg',
            'image/png8',
            'image/png; mode=8bit',
            'image/svg',
            'image/svg xml',
            'image/svg+xml',
            'image/tiff',
            'image/tiff8',
            'kml',
            'kmz',
            'openlayers',
            'rss'
          ],
          'title':'incidentes_copeco',
          'queryable':true,
          'llbbox':[
            -91.02745345567851,
            13.377182634851891,
            -84.25438216661354,
            15.520765886648507
          ]
        },
        'source':'2',
        'tiled':true,
        'title':'incidentes_copeco',
        'fixed':false,
        'transparent':true
      },
      {
        'opacity':1,
        'name':'geonode:puestos_de_control',
        'format':'image/png',
        'cached':true,
        'selected':false,
        'visibility':true,
        'capability':{
          'abstract':'No abstract provided',
          'nestedLayers':[

          ],
          'cascaded':0,
          'fixedHeight':0,
          'prefix':'geonode',
          'keywords':[

          ],
          'noSubsets':false,
          'dimensions':{

          },
          'opaque':false,
          'infoFormats':[
            'text/plain',
            'application/vnd.ogc.gml',
            'application/vnd.ogc.gml/3.1.1',
            'text/html',
            'application/json'
          ],
          'styles':[
            {
              'abstract':'',
              'title':'',
              'legend':{
                'height':'20',
                'width':'20',
                'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/wms?request=Ge…gendGraphic&format=image%2Fpng&width=20&height=20&layer=puestos_de_control',
                'format':'image/png'
              },
              'name':'puestos_de_control'
            }
          ],
          'attribution':{
            'title':'admin'
          },
          'authorityURLs':{

          },
          'bbox':{
            'EPSG:4326':{
              'srs':'EPSG:4326',
              'bbox':[
                -91.02745345567851,
                13.377182634851891,
                -84.25438216661354,
                15.520765886648507
              ]
            }
          },
          'fixedWidth':0,
          'metadataURLs':[
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=6771c2ef-25c1-4878-8e0e-2847ef2b92b6',
              'type':'FGDC',
              'format':'text/xml'
            },
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=6771c2ef-25c1-4878-8e0e-2847ef2b92b6',
              'type':'TC211',
              'format':'text/xml'
            }
          ],
          'name':'geonode:puestos_de_control',
          'identifiers':{

          },
          'srs':{
            'EPSG:900913':true
          },
          'formats':[
            'image/png',
            'application/atom xml',
            'application/atom+xml',
            'application/openlayers',
            'application/pdf',
            'application/rss xml',
            'application/rss+xml',
            'application/vnd.google-earth.kml',
            'application/vnd.google-earth.kml xml',
            'application/vnd.google-earth.kml+xml',
            'application/vnd.google-earth.kml+xml;mode=networklink',
            'application/vnd.google-earth.kmz',
            'application/vnd.google-earth.kmz xml',
            'application/vnd.google-earth.kmz+xml',
            'application/vnd.google-earth.kmz;mode=networklink',
            'atom',
            'image/geotiff',
            'image/geotiff8',
            'image/gif',
            'image/gif;subtype=animated',
            'image/jpeg',
            'image/png8',
            'image/png; mode=8bit',
            'image/svg',
            'image/svg xml',
            'image/svg+xml',
            'image/tiff',
            'image/tiff8',
            'kml',
            'kmz',
            'openlayers',
            'rss'
          ],
          'title':'puestos_de_control',
          'queryable':true,
          'llbbox':[
            -91.02745345567851,
            13.377182634851891,
            -84.25438216661354,
            15.520765886648507
          ]
        },
        'source':'2',
        'tiled':true,
        'title':'puestos_de_control',
        'fixed':false,
        'transparent':true
      },
      {
        'opacity':1,
        'name':'geonode:zonas_de_aterrizaje_de_helicopteros',
        'format':'image/png',
        'cached':true,
        'selected':true,
        'visibility':true,
        'capability':{
          'abstract':'No abstract provided',
          'nestedLayers':[

          ],
          'cascaded':0,
          'fixedHeight':0,
          'prefix':'geonode',
          'keywords':[

          ],
          'noSubsets':false,
          'dimensions':{

          },
          'opaque':false,
          'infoFormats':[
            'text/plain',
            'application/vnd.ogc.gml',
            'application/vnd.ogc.gml/3.1.1',
            'text/html',
            'application/json'
          ],
          'styles':[
            {
              'abstract':'',
              'title':'',
              'legend':{
                'height':'20',
                'width':'20',
                'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/wms?request=Ge…t=image%2Fpng&width=20&height=20&layer=zonas_de_aterrizaje_de_helicopteros',
                'format':'image/png'
              },
              'name':'zonas_de_aterrizaje_de_helicopteros'
            }
          ],
          'attribution':{
            'title':'admin'
          },
          'authorityURLs':{

          },
          'bbox':{
            'EPSG:4326':{
              'srs':'EPSG:4326',
              'bbox':[
                -91.02745345567851,
                13.377182634851891,
                -84.25438216661354,
                15.520765886648507
              ]
            }
          },
          'fixedWidth':0,
          'metadataURLs':[
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=7f6dec65-39ee-4ac7-8e76-ed2ca9b9363f',
              'type':'FGDC',
              'format':'text/xml'
            },
            {
              'href':'http://ec2-174-129-197-156.compute-1.amazonaws.com/catalogue/csw?outputsche…&version=2.0.2&elementsetname=full&id=7f6dec65-39ee-4ac7-8e76-ed2ca9b9363f',
              'type':'TC211',
              'format':'text/xml'
            }
          ],
          'name':'geonode:zonas_de_aterrizaje_de_helicopteros',
          'identifiers':{

          },
          'srs':{
            'EPSG:900913':true
          },
          'formats':[
            'image/png',
            'application/atom xml',
            'application/atom+xml',
            'application/openlayers',
            'application/pdf',
            'application/rss xml',
            'application/rss+xml',
            'application/vnd.google-earth.kml',
            'application/vnd.google-earth.kml xml',
            'application/vnd.google-earth.kml+xml',
            'application/vnd.google-earth.kml+xml;mode=networklink',
            'application/vnd.google-earth.kmz',
            'application/vnd.google-earth.kmz xml',
            'application/vnd.google-earth.kmz+xml',
            'application/vnd.google-earth.kmz;mode=networklink',
            'atom',
            'image/geotiff',
            'image/geotiff8',
            'image/gif',
            'image/gif;subtype=animated',
            'image/jpeg',
            'image/png8',
            'image/png; mode=8bit',
            'image/svg',
            'image/svg xml',
            'image/svg+xml',
            'image/tiff',
            'image/tiff8',
            'kml',
            'kmz',
            'openlayers',
            'rss'
          ],
          'title':'zonas_de_aterrizaje_de_helicopteros',
          'queryable':true,
          'llbbox':[
            -91.02745345567851,
            13.377182634851891,
            -84.25438216661354,
            15.520765886648507
          ]
        },
        'source':'2',
        'tiled':true,
        'title':'zonas_de_aterrizaje_de_helicopteros',
        'fixed':false,
        'transparent':true
      }
    ],
    'center':[
      -9707163.4015525,
      1585022.104872
    ],
    'units':'m',
    'maxResolution':156543.03390625,
    'maxExtent':[
      -20037508.34,
      -20037508.34,
      20037508.34,
      20037508.34
    ],
    'zoom':15,
    'projection':'EPSG:900913'
  },
  'id':144,
  'sources':{
    '0':{
      'id':'1',
      'ptype':'gxp_olsource'
    },
    '1':{
      'id':'2',
      'ptype':'gxp_mapquestsource'
    },
    '2':{
      'title':'Local Geoserver',
      'url':'http://ec2-174-129-197-156.compute-1.amazonaws.com/geoserver/wms',
      'baseParams':{
        'VERSION':'1.1.1',
        'REQUEST':'GetCapabilities',
        'TILED':true,
        'SERVICE':'WMS'
      },
      'ptype':'gxp_wmscsource',
      'restUrl':'/gs/rest',
      'id':'0'
    }
  }
};