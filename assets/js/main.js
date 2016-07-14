'use strict';

/* FLAGS */
var DEBUG_ENV = false;
/* endof FLAGS */

// Debugger open for the end-user (hope nobody visits this on any ancient IE or it'll break 😐). Just because ;)
var Debugging = (function toggleDebug() {
    console.log("INFO: You can see the logs of what is happening by calling Debugging.toggleDebug() 😉");

    function toggleDebug() {
        DEBUG_ENV = DEBUG_ENV ? false : true;
        console.log("INFO: Debugging set to", DEBUG_ENV);
    }
    return {
        toggleDebug: toggleDebug
    };
})();

/* UTILS */
function whichTransitionEvent() {
    // Thanks, David :)) https://davidwalsh.name/css-animation-callback
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
/* endof UTILS */

var app = angular.module('app', []);
app.controller('ProjectsController', ['$scope', '$http', function($scope, $http) {
    $http({
            method: 'GET',
            url: 'assets/res/projects.json'
        })
        .then(
            function(r) {
                if (DEBUG_ENV) {
                    console.log(r.data.skills);
                    console.log(r.data.projects);
                }
                $scope.skills = r.data.skills;
                $scope.projects = r.data.projects;
            },
            function(r, e) {
                if (DEBUG_ENV) console.log("Err", e);
                $scope.skills = r.data.skills;
                $scope.projects = r.data.projects;
            }
        );
}]);



(function fadeOutCtaScrollOnScroll() {
    var ctaScrollElement = document.getElementById('cta-scroll');
    var initialCtaScrollOffset = ctaScrollElement.offsetTop;
    window.addEventListener('scroll', function() {
        var pxsFromTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        var ctaScrollOffset = ctaScrollElement.getBoundingClientRect().top;

        if (pxsFromTop >= initialCtaScrollOffset)
            ctaScrollElement.style.opacity = 0;
        else if (pxsFromTop <= 0) {
            ctaScrollElement.style.opacity = 1;
        } else {
            if (DEBUG_ENV) console.log('#cta-scroll bounding rectangle offset:', ctaScrollOffset, '#cta-scroll initial offset:', initialCtaScrollOffset);
            ctaScrollElement.style.opacity = ctaScrollOffset / initialCtaScrollOffset;
        }
    }, false);
})();

(function handleSnapPoints() {
    var components = document.querySelectorAll('.component');
    var componentsOffsets = [];
    components.forEach(function(element) {
        componentsOffsets.push(element.offsetTop);
    }, this);
})();

(function setAuthorsAge() {
    var element = document.getElementById('age');

    var birthDate = new Date(1996, 10, 9); // 1996-11-09
    var todaysDate = new Date();

    var msInOneYear = 365 * 24 * 60 * 60 * 1000;

    var numberOfYears = Math.floor((todaysDate.getTime() - birthDate.getTime()) / msInOneYear);

    element.innerHTML = parseInt(numberOfYears);
})();

var Nav = (function() {
    var navElement = document.querySelector('#mainNav ul');
    var navElementItems = document.querySelectorAll('#mainNav a');
    var showNavBtn = document.getElementById('showNavBtn');

    function initialize() {
        showNavBtn.addEventListener('click', toggleNav, false);
        navElementItems.forEach(function(element) {
            element.addEventListener('click', toggleNav, false);
        }, this);
    }

    function isNavShown() {
        return navElement.getAttribute('class') === 'active';
    }

    function toggleNav() {
        if (DEBUG_ENV) console.log("Is nav open:", isNavShown());
        if (!isNavShown())
            navElement.setAttribute('class', 'active');
        else
            navElement.removeAttribute('class');
    }

    initialize();
})();

var Slider = (function() {
    var slider = document.getElementById('heroSlider');
    var slides = document.querySelectorAll('#heroSlider article');
    var slidingInterval = 7000;
    var numberOfSlides = slides.length;
    var endOfAnimationEvent = whichTransitionEvent();

    var slidingOutClass = 'prevSlide';
    var currentClass = 'currentSlide';
    var playClass = 'activeSlide';
    var slidingInClass = 'nextSlide';

    var isSlideChanging = false;
    var prevSlideIndex;
    var currentSlideIndex = 0;
    var nextSlideIndex;
    var movingOutSlide;
    var movingInSlide;

    var touchXStart;

    function initialize() {
        console.log("INFO: Slider._changeSlide() requires 'next' or 'prev' as parameters when called from within the console. Not recommended, use nextSlide() and prevSlide() for the same effect.");
        document.getElementById('slide' + currentSlideIndex).setAttribute('class', currentClass);
        if (DEBUG_ENV) console.log("Current slide ", currentSlideIndex);

        if (slides.length > 1) {
            document.getElementById('prevSliderBtn').addEventListener('click', _changeSlide, false);
            document.getElementById('nextSliderBtn').addEventListener('click', _changeSlide, false);

            document.addEventListener('keydown', _handleOnKeyPress, false);

            slider.addEventListener('touchstart', function(e) {
                touchXStart = e.touches[0].clientX;
            }, false);
            slider.addEventListener('touchmove', _handleOnTouchMove, false);

            window.setInterval(_changeSlide.bind(this, 'next'), slidingInterval);
        }
    }

    function _changeSlide(b) {
        var behavior = b || null;

        var changePrev = behavior === 'prev' || this !== undefined && this.getAttribute('id') === 'prevSliderBtn';

        if (isSlideChanging)
            return false;
        else {
            isSlideChanging = true;

            if (changePrev) {
                if (currentSlideIndex > 0) {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex--);
                } else {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex);
                    currentSlideIndex = numberOfSlides - 1;
                }
            } else {
                if (currentSlideIndex < numberOfSlides - 1) {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex++);
                } else {
                    movingOutSlide = document.getElementById('slide' + currentSlideIndex);
                    currentSlideIndex = 0;
                }
            }

            movingInSlide = document.getElementById('slide' + currentSlideIndex);

            movingOutSlide.setAttribute('class', changePrev ? slidingInClass : slidingOutClass);
            movingOutSlide.addEventListener(endOfAnimationEvent, function() {
                if (DEBUG_ENV) console.log(endOfAnimationEvent, "1");
                isSlideChanging = false;
                movingOutSlide.removeAttribute('class');
            }, false);

            movingInSlide.setAttribute('class', changePrev ? slidingOutClass : slidingInClass);
            movingInSlide.addEventListener(endOfAnimationEvent, function() {
                if (DEBUG_ENV) console.log(endOfAnimationEvent, "2");
                isSlideChanging = false;
                movingInSlide.setAttribute('class', currentClass + " " + playClass);
            }, false);
        }
        if (DEBUG_ENV) console.log("Current slide ", currentSlideIndex);
    }

    function _handleOnKeyPress(e) {
        if (DEBUG_ENV) console.log('Detected key pressed code:', e.keyCode);
        switch (e.keyCode) {
            case 37:
                _changeSlide('prev');
                break;
            case 39:
                _changeSlide('next');
                break;
        }
    }

    function _handleOnTouchMove(e) {
        if (!touchXStart) return false;

        var touchXEnd = e.touches[0].clientX;

        var differenceX = touchXEnd - touchXStart;
        if (Math.abs(differenceX) > 0) {
            if (differenceX < 0) {
                if (DEBUG_ENV) console.log("Swiped left!");
                _changeSlide('next');
            } else {
                if (DEBUG_ENV) console.log("Swiped right!");
                _changeSlide('prev');
            }
        }

    }

    initialize();

    return {
        initialize: initialize,
        _changeSlide: _changeSlide,
        prevSlide: _changeSlide.bind(this, 'prev'),
        nextSlide: _changeSlide.bind(this, 'next')
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