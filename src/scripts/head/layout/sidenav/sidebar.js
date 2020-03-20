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
            for (i in menuToggleBars) {
                menuToggleBars[i].classList.add('notransition');
            }

            document.getElementById('menu-toggle').classList.toggle("open");
            document.getElementById('menu-toggle').style.marginLeft = "0";
            document.getElementById('menu-toggle').offsetHeight;
            document.getElementById('swipe-area').style.borderLeftWidth = "40px";

            for (i in menuToggleBars) {
                menuToggleBars[i].classList.remove('notransition');
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
