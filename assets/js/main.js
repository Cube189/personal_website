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
};
