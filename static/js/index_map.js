var map = null;

function AddMapData(mapData, markersActive, heatMapActive)
{
    if(markersActive)
    {
        mapData.forEach(element => {
            addMarker(element.lat, element.long, element.dB);
        });
    }

    if(heatMapActive)
    {
        var heatMapData = [];

        mapData.forEach(element => {
            heatMapData.push({location: new google.maps.LatLng(element.lat, element.long), weight: element.dB});
            console.log(heatMapData);
        });

        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatMapData,
            map: map,
            radius: 40
          });        
    }
}

function addMarker(latitude, longitude, dB) {
    marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: String(dB) + ' dB'
    });
}