var map = null;

function AdicionaPontosTeste()
{
      var heatMapData = [
        {location: new google.maps.LatLng(-25.451, -49.26), weight: 60},
        {location: new google.maps.LatLng(-25.452, -49.26), weight: 80},
        {location: new google.maps.LatLng(-25.453, -49.26), weight: 100},
        {location: new google.maps.LatLng(-25.454, -49.26), weight: 80}
      ];

      var gradientColors = [
        'rgba(0, 255, 0, 0)',
        'rgba(255, 0, 0, 1)'
    ]

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        map: map,
        radius: 40
      });
}

function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}