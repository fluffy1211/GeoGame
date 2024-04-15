var map = L.map('map').setView([48.866667, 2.333333], 13);
var div = document.getElementById('map');
const popup = L.popup();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([48.848870698431845, 2.388451479869548]).addTo(map);

function markerClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Vous avez cliqué sur le marqueur aux coordonnées : " + e.latlng.toString() + " Mathilde est la goat")
        .openOn(map);
}

marker.on('click', markerClick);

var MARKERS_MAX = 4;

// a layer group, used here like a container for markers
var markersGroup = L.layerGroup();
map.addLayer(markersGroup);

map.on('click', function(e) {
    // get the count of currently displayed markers
    var markersCount = markersGroup.getLayers().length;

    if (markersCount < MARKERS_MAX) {
        var marker = L.marker(e.latlng).addTo(markersGroup);
        marker.on('click', function(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("Vous avez cliqué sur le marqueur aux coordonnées : " + e.latlng.toString())
                .openOn(map);
        });
        return;
    }

    // remove the markers when MARKERS_MAX is reached
    markersGroup.clearLayers();
});