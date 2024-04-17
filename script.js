// import "./node_modules/animate.css";

var map = L.map('map').setView([48.866667, 2.333333], 2);
var div = document.getElementById('map');
const popup = L.popup();
var circle = L.circle();
const btn = document.querySelector('.next');
const button = document.querySelector('.button');


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.tileLayer.provider('Esri.WorldImagery').addTo(map);


// var marker = L.marker([48.848870698431845, 2.388451479869548]).addTo(map);

var marker;

map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
    marker.on('click', function(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Vous avez cliqué sur le marqueur aux coordonnées : " + e.latlng.toString())
            .openOn(map);
    });
});

axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
        const countries = response.data;
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        const countryName = randomCountry.name.common;
        const capital = randomCountry.capital[0];
        const latlng = randomCountry.latlng;

        const countryInfo = document.getElementById('countryinfo');
        countryInfo.innerHTML = `
        <div class="cards">
        <h2>${countryName}</h2>
        <h2>${capital}</h2>
        <h2>${latlng}</h2>
        </div>
        `;


        // Append the country info to a container outside the map
        const container = document.getElementById('container');
        container.appendChild(countryInfo);

        // Set radius circle for the capital
        const circle = L.circle(latlng, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 10000// Set the desired radius in meters
        });  


        var redmarker = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        map.on('click', function(e) {
            
            if (!circle.getBounds().contains(e.latlng)) {
            marker = L.marker(latlng).addTo(map);
            redmarker = L.marker(latlng, {icon: redmarker}).addTo(map);
            setTimeout(function() {                
            alert("Tu pues la merde !");
            }, 500);
            } else {
            marker = L.marker(latlng).addTo(map);               
            redmarker = L.marker(latlng, {icon: redmarker}).addTo(map);
            setTimeout(function() {  
            alert("Bien joué...");
            }, 500);
            }

            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'animate__animated animate__bounceIn';
            nextBtn.textContent = 'Next';
            button.appendChild(nextBtn);

            map.off('click');


            nextBtn.addEventListener('click', function() {
                location.reload();


            });
            
        });


        // Hide the circle by setting its style to transparent
        circle.setStyle({ opacity: 0, fillOpacity: 0 });

        // Add the circle to the map
        map.addLayer(circle);
            
    })
    .catch((error) => {
        console.error(error);
    }
    );

