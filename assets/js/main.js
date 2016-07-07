function getComponentsOffset() {
    var components = document.querySelectorAll('.component');
    var componentsOffset = [];
    // var componentsColors = [];

    for (var i = 0; i < components.length; i++) {
        componentsOffset.push(components[i].offsetTop);
    }

    return componentsOffset;
}

function highlightMenuItems() {
    var componentsOffset = getComponentsOffset();
    var menuItems = document.querySelectorAll('#mainNav li');

    for (var i = componentsOffset.length; i > 1; i--) { // 0 is for slider we dont want
        if (pxFromTop >= componentsOffset[i]) {
            document.getElementById(menuItems[i].getAttribute('id')).className = "active";
            return 0;
        }
    }
}

function setAuthorsAge() {
    var element = document.getElementById('age');

    var birthDate = new Date(1996, 10, 9);
    var todaysDate = new Date();

    var msInOneYear = 365 * 24 * 60 * 60 * 1000;

    var numberOfYears = Math.floor((todaysDate.getTime() - birthDate.getTime()) / msInOneYear);

    element.innerHTML = numberOfYears;
}

window.onload = function() {
    setAuthorsAge();

    document.addEventListener('scroll', function() {
        var pxFromTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

        // highlightMenuItems();
        if (pxFromTop > 58) {
            document.querySelector('body').setAttribute('class', 'active');
        }
    });

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3ViZTE4OSIsImEiOiJjaXFjaW1hc3owMDRnaHhuaGg1NWh5dzI4In0.NS91wgNockGS26POuAhA5A';
    var map = new mapboxgl.Map({
        "container": 'map',
        "style": 'mapbox://styles/cube189/ciqcjfxw8002idxm4welgv2mu',
        "center": [
            19.480556, 52.069167
        ],
        "zoom": 5
    });
    map.on('load', function() {
        map.addSource("lublinMarker", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [22.4236878, 51.2180254]
                        },
                        "properties": {
                            "marker-symbol": "monument"
                        }
                    }
                ]
            }
        });

        map.addLayer({
            "id": "lublinPoint",
            "type": "circle",
            "source": "lublinMarker",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#b933ad"
            }
        });

        map.flyTo({"zoom": 5.7})
    });
};
