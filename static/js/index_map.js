var map = null;

function AdicionaPontosTeste()
{
      var heatMapData = [
        {location: new google.maps.LatLng(-25.45, -49.26), weight: 1}
      ];

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map
      });
}

function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}