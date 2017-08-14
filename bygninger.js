var urlarcgis= 'http://copernicus.hig.no:6080/arcgis/rest/services';
var folder = '/helenekd01';
var servicename = '/bergenBygning';
var servicetype = '/MapServer/WMTS?';
var url = urlarcgis + folder + servicename + servicetype;

var layer = 'helenekd01_bergenBygning';

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extentKartverket = [
  -2000000, 3500000,
  3545984, 9045984
];

var extentCopernicus = [
  288917.55, 6680123.39, // lower left:  Easting, Northing
  315693.33, 6715743.63 // upper right: Easting, Northing
];

// Datum og projeksjon: EUREF89, UTM zone 32
var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extentKartverket
});

// Oppløsning pr. pixel i meter pr. tileMatrix (zoom-nivå)
var resolutions = [  // = ScaleDenominator * 0.00028
  66.1459656253, // = 236235.59151877242 * 0.00028
  33.0729828126, // = 118117.79575938621 * 0.00028
  16.9333672001, // = 60476.31142880573 * 0.00028
  8.46668360003, // = 30238.155714402867 * 0.00028
  4.23334180002, // = 15119.077857201433 * 0.00028
];

var matrixSet = 'default028mm'; // standard-verdi for ArcGIS
var matrixIds = [0, 1, 2, 3, 4];

var center = [298216.140356, 6699358.382082]; // Easting, Northing
var zoom = 0;

var bygninger = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: url,
    layer: layer,
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extentCopernicus,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var topo2 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://openwms.statkart.no/skwms1/wms.topo2?',
    params: {
      'LAYERS': 'topo2_WMS',
      'STYLES': 'default'
    },
  })
});

var map = new ol.Map({
  layers: [topo2, bygninger],
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: center,
    resolutions: resolutions,
    zoom: zoom
  })
});
