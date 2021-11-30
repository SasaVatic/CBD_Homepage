const header = document.querySelector('.header');
const toggleBtn = document.querySelector('.navigation__toggler');
const toggleLine = document.querySelector('.navigation__toggler-line');
const menuItems = document.querySelectorAll('.navigation__items');
const menuLinks = document.querySelectorAll('.navigation__link');
const logoLink = document.querySelector('.navigation__logo-link');

function openCloseMenu() {
    toggleBtn.classList.toggle('active');
    toggleLine.classList.toggle('active');
    menuItems[0].classList.toggle('active');
    menuItems[1].classList.toggle('active');

    if(toggleBtn.classList.contains('active')) {
        header.classList.remove('scroll-active');
    }
    else {
        if(window.scrollY > 0) {
            header.classList.add('scroll-active');
        }
    }
}

function removeActive() {
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].classList.remove('active');
    }
}

function markActiveLink(event) {
    removeActive();
    openCloseMenu();
    event.target.classList.add('active');
}

toggleBtn.onclick = openCloseMenu;

document.onscroll = function() {
    if(window.scrollY > 0 && !toggleBtn.classList.contains('active')) {
        header.classList.add('scroll-active');
    }
    else {
        header.classList.remove('scroll-active');
    }
}

menuLinks.forEach(l => {
    l.addEventListener('click', markActiveLink);
});

logoLink.onclick = function () {
    removeActive();
    menuLinks[0].classList.add('active');
}