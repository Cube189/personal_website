'use strict';

//flags
const DEBUG_ENV = false;
//endof flags

//utils
// Thanks, David :)) https://davidwalsh.name/css-animation-callback
function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}
//endof utils

(function setAuthorsAge() {
    var element = document.getElementById('age');

    var birthDate = new Date(1996, 10, 9);
    var todaysDate = new Date();

    var msInOneYear = 365 * 24 * 60 * 60 * 1000;

    var numberOfYears = Math.floor((todaysDate.getTime() - birthDate.getTime()) / msInOneYear);

    element.innerHTML = parseInt(numberOfYears);
})();

var Slider = (function() {
    var slider = document.getElementById('heroSlider');
    var slides = document.querySelectorAll('#heroSlider article');
    var numberOfSlides = slides.length;
    var endOfAnimationEvent = whichTransitionEvent();

    var slidingOutClass = 'prevSlide';
    var currentClass = 'currentSlide';
    var playClass = 'activeSlide'
    var slidingInClass = 'nextSlide';

    var isSlideChanging = false;
    var prevSlideIndex;
    var currentSlideIndex = 0;
    var nextSlideIndex;
    var movingOutSlide;
    var movingInSlide;

    function initialize() {
        console.log("INFO: Slider.changeSlide() requires 'next' or 'prev' as parameters when called from within the console. Use nextSlide()/prevSlide() for the same effect.");
        document.getElementById('slide' + currentSlideIndex).setAttribute('class', currentClass);
        if (DEBUG_ENV) console.log("Current slide ", currentSlideIndex);
    }

    function changeSlide(b) {
        const behavior = b || null;
        if (isSlideChanging)
            return false;
        else {
            isSlideChanging = true;

            if (behavior === 'prev' || this !== undefined && this.getAttribute('id') === 'prevSliderBtn') {
                if (currentSlideIndex > 0) {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex--);
                } else {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex);
                    currentSlideIndex = numberOfSlides - 1;
                }
            } else if (behavior === 'next' || this !== undefined && this.getAttribute('id') === 'nextSliderBtn') {
                if (currentSlideIndex < numberOfSlides - 1) {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex++);
                } else {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex);
                    currentSlideIndex = 0;
                }
            }

            movingInSlide = document.getElementById('slide' + currentSlideIndex);

            movingOutSlide.setAttribute('class', slidingOutClass);
            movingOutSlide.addEventListener(endOfAnimationEvent, function() {
                if (DEBUG_ENV) console.log(endOfAnimationEvent, "1");
                isSlideChanging = false;
                movingOutSlide.removeAttribute('class');
            }, false);

            movingInSlide.setAttribute('class', slidingInClass);
            movingInSlide.addEventListener(endOfAnimationEvent, function() {
                if (DEBUG_ENV) console.log(endOfAnimationEvent, "2");
                isSlideChanging = false;
                movingInSlide.setAttribute('class', currentClass + " " + playClass);
            }, false);
        }
        if (DEBUG_ENV) console.log("Current slide ", currentSlideIndex);
    }

    initialize();

    document.getElementById('prevSliderBtn').addEventListener('click', changeSlide, false);
    document.getElementById('nextSliderBtn').addEventListener('click', changeSlide, false);

    // window.setInterval(function() { changeSlide('next') }, 5000);
    window.setInterval(changeSlide.bind(this, 'next'), 7000);

    return {
        initialize: initialize,
        changeSlide: changeSlide,
        prevSlide: changeSlide.bind(this, 'prev'),
        nextSlide: changeSlide.bind(this, 'next')
    };
})();

// Mapbox junk 🤐
(function() {
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
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [22.570802, 51.4583888]
                    },
                    "properties": {
                        "marker-symbol": "monument"
                    }
                }]
            }
        });

        map.addLayer({
            "id": "lublinPoint",
            "type": "circle",
            "source": "lublinMarker",
            "paint": {
                "circle-radius": 9,
                "circle-color": "#b933ad"
            }
        });

        map.flyTo({
            "zoom": 5.7
        });
    });
})();
