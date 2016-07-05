function getComponentsOffset() {
    var components = document.querySelectorAll('.component');
    var componentsOffset = [];
    // var componentsColors = [];

    for (var i = 0; i < components.length; i++) {
        componentsOffset.push(components[i].offsetTop);
        // componentsColors.push(components[i].getAttribute('data-bgColor'));
        // document.getElementById(components[i].getAttribute('id')).removeAttribute('data-bgColor');
    }

    return componentsOffset;
}

// function changeBgColor() {
//     var currentBgColor;
//     var nextBgColor;
//     for (var i = 0; i < componentsOffset.length - 1; i++) {
//         if (pxFromTop >= componentsOffset[i] && pxFromTop < componentsOffset[i + 1]) {
//             currentBgColor = componentsColors[i];
//             nextBgColor = componentsColors[i + 1];
//             console.log(currentBgColor, nextBgColor);
//             document.body.style.backgroundColor = "rgb" + currentBgColor;
//         }
//     }
// }

function highlightMenuItems() {
    var componentsOffset = getComponentsOffset();
    var menuItems = document.querySelectorAll('#mainNav li');

    for (var i = componentsOffset.length; i > 1; i--) {   // 0 is for slider we dont want
        if (pxFromTop >= componentsOffset[i]) {
            document.getElementById(menuItems[i].getAttribute('id')).className = "active";
            return 0;
        }
    }
}

window.onload = function() {

    document.addEventListener('scroll', function() {
      var pxFromTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // highlightMenuItems();
      if (pxFromTop > 58) {
        document.querySelector('body').setAttribute('class', 'active');
      }
    });
};
