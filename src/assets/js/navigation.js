const header = document.querySelector('.header');
const toggleBtn = document.querySelector('.navigation__toggler');
const toggleLine = document.querySelector('.navigation__toggler-line');
const menuItems = document.querySelectorAll('.navigation__items');
const menuLinks = document.querySelectorAll('.navigation__link');
const logoLink = document.querySelector('.navigation__logo-link');
const breakPoint = 768;

function openCloseMenu() {
    toggleBtn.classList.toggle('active');
    toggleLine.classList.toggle('active');
    menuItems[0].classList.toggle('active');
    menuItems[1].classList.toggle('active');

    if (toggleBtn.classList.contains('active')) {
        header.classList.remove('scroll-active');
    }
    else {
        if (window.scrollY > 0) {
            header.classList.add('scroll-active');
        }
    }
}

function closeMenu() {
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].classList.remove('active');
    }
    toggleBtn.classList.remove('active');
    toggleLine.classList.remove('active');
    menuItems[0].classList.remove('active');
    menuItems[1].classList.remove('active');
}

function markActiveLink(event) {
    closeMenu();
    event.target.classList.add('active');
}

function changeNavBackground() {
    if (window.scrollY > 0 && !toggleBtn.classList.contains('active')) {
        header.classList.add('scroll-active');
    }
    else if (window.scrollY > 0 && window.innerWidth > breakPoint) {
        header.classList.add('scroll-active');
    }
    else {
        header.classList.remove('scroll-active');
    }
}

toggleBtn.onclick = openCloseMenu;

menuLinks.forEach(l => {
    l.addEventListener('click', markActiveLink);
});

logoLink.onclick = function () {
    closeMenu();
    menuLinks[0].classList.add('active');
}

document.onscroll = function () {
    changeNavBackground();
}

window.onresize = function () {
    changeNavBackground();
}