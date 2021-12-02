'use strict';

const tabLabelsBox = document.querySelector('.tab__labels-box');
const tabContent = document.querySelector('.tab__content');

const getData = async function () {
    const response = await fetch('./assets/data/tabs-data.json');

    const data = await response.json();

    return data;
}

getData()
    .then((data) => {
        createTabComponent(data);
        markActiveTab();
        setTabsHeight();
    });


const createTabComponent = (data) => {
    const tabsData = data.tabsData;

    for (let i = 0; i < tabsData.length; i++) {
        const tabLabel = document.createElement('p');
        tabLabel.textContent = tabsData[i].label;
        tabLabel.className = 'tab__label';
        tabLabelsBox.appendChild(tabLabel);

        const tabContentBox = document.createElement('div');
        tabContentBox.className = 'tab__content-box';
        const tabTextBox = document.createElement('div');
        tabTextBox.className = 'tab__text-box';
        const tabImgBox = document.createElement('div');
        tabImgBox.className = 'tab__img-box';

        tabContentBox.appendChild(tabTextBox);
        tabContentBox.appendChild(tabImgBox);
        tabContent.appendChild(tabContentBox);

        const tabHeading = document.createElement('h3');
        tabHeading.textContent = tabsData[i].title;
        tabHeading.className = 'tab__heading';
        tabTextBox.appendChild(tabHeading);

        const textArr = tabsData[i].text.split('\n');
        for (let j = 0; j < textArr.length; j++) {
            const tabText = document.createElement('p');
            tabText.textContent = textArr[j];
            tabText.className = 'tab__text';
            tabTextBox.appendChild(tabText);
        }

        const imgUrls = tabsData[i].imgUrls;
        for (let k = 0; k < imgUrls.length; k++) {
            const tabImg = document.createElement('img');
            tabImg.className = 'tab__img';
            tabImg.src = imgUrls[k];
            tabImgBox.appendChild(tabImg);
        }

        if (i === 0) {
            tabLabel.classList.add('active');
            tabContentBox.classList.add('active');
        }
    }
}

function markActiveTab() {
    const tabLabels = document.querySelectorAll('.tab__label');
    tabLabels.forEach(lbl => {
        lbl.addEventListener('click', () => {
            for (let i = 0; i < tabLabels.length; i++) {
                tabLabels[i].classList.remove('active');
            }
            lbl.classList.add('active');
            const lblIndex = [...tabLabels].indexOf(lbl);
            showActiveTab(lblIndex);
        });
    });
}

function showActiveTab(lblIndex) {
    console.log(lblIndex)
    const tabs = document.querySelectorAll('.tab__content-box');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[lblIndex].classList.add('active');
}

function setTabsHeight() {
    const contentBoxes = document.querySelectorAll('.tab__content-box');
    let boxHeight = 0;
    let boxIndex = 0;

    for (let l = 0; l < contentBoxes.length; l++) {
        if (contentBoxes[l].offsetHeight > boxHeight) {
            boxHeight = contentBoxes[l].offsetHeight;
            boxIndex = l;
        }
    }
    contentBoxes[boxIndex].classList.add('static-box');
}