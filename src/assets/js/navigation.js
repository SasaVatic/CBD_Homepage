const toggleBtn = document.querySelector('.navigation__toggler');
const toggleLine = document.querySelector('.navigation__toggler-line');
const menuItems = document.querySelectorAll('.navigation__items');
const menuLinks = document.querySelectorAll('.navigation__link');
const logoLink = document.querySelector('.navigation__logo-link');

function openCloseMenu() {
    toggleLine.classList.toggle('active');
    menuItems[0].classList.toggle('active');
    menuItems[1].classList.toggle('active');
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

menuLinks.forEach(l => {
    l.addEventListener('click', markActiveLink);
});

logoLink.onclick = function () {
    removeActive();
    menuLinks[0].classList.add('active');
}