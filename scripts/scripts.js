var isSidenavOpen = false;

function toggleSidenav() {
    // If in mobile mode
    if ( window.innerWidth < 768 ) {
        if (!isSidenavOpen) {
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
            document.getElementById('menu-toggle').classList.toggle("open");
            document.getElementById('menu-toggle').style.marginLeft = "250px";

            document.getElementById('menu-list').style.width = "250px";

            document.getElementById('swipe-area').style.borderLeftWidth = window.innerWidth.toString() + "px";

            isSidenavOpen = true;
        }
        else {
            document.body.style.backgroundColor = '#f4f4f4';

            document.getElementById('menu-toggle').classList.toggle("open");
            document.getElementById('menu-toggle').style.marginLeft = "0";

            document.getElementById('menu-list').style.width = "0px";

            document.getElementById('swipe-area').style.borderLeftWidth = "40px";

            isSidenavOpen = false;
        }
    }
}

function resetNavMenu() {
    document.body.style.backgroundColor = '#f4f4f4';
    document.getElementById('menu-list').classList.add('notransition');
    if ( window.innerWidth < 768) {

        if (isSidenavOpen) {
            document.getElementById('menu-toggle').classList.add('notransition');
            var menuToggleBars = document.getElementById('menu-toggle').getElementsByTagName('span');

            for (bar of menuToggleBars) {
                bar.classList.add('notransition');
            }

            document.getElementById('menu-toggle').classList.toggle("open");
            document.getElementById('menu-toggle').style.marginLeft = "0";
            document.getElementById('menu-toggle').offsetHeight;
            document.getElementById('swipe-area').style.borderLeftWidth = "40px";

            for (bar of menuToggleBars) {
                bar.classList.remove('notransition');
            }
            document.getElementById('menu-toggle').classList.remove('notransition');
            isSidenavOpen = false;
        }

        document.getElementById('menu-list').style.width = "0";
        document.getElementById('menu-list').style.transition = "width .5s";
        document.getElementById('menu-list').offsetHeight;
    }
    else {
        document.getElementById('menu-list').style.width = "100%";
        document.getElementById('menu-list').style.transition = "none";
    }
    document.getElementById('menu-list').classList.remove('notransition');
}
window.addEventListener('resize', resetNavMenu);

function swipedetect(el, callback){

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}


swipedetect(document.getElementById('swipe-area'), function(swipedir){
    if ( window.innerWidth < 768 ) {
        if (swipedir === 'right' && !isSidenavOpen) {
            toggleSidenav();
        }
        else if ( (swipedir === 'left' || swipedir === 'none') && isSidenavOpen) {
            toggleSidenav();
        }
    }
});

