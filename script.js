"use strict"

const characters = [

    {
        unlocked: 1,
        picLink: 'pics/stewie-icon.jpg',
        picClass: '.stewie-pic',
        nameClass: '.stewie-text',
        charPic: 'pics/stewie.png',
        price: 0,
        clickValue: 2,
        name: 'Stewie',
    },
    {
        unlocked: 0,
        picLink: 'pics/peter-icon.jpg',
        picClass: '.peter-pic',
        nameClass: '.peter-text',
        charPic: 'pics/peter.png',
        price: 500,
        clickValue: 50,
        name: 'Peter',
    },

    {
        unlocked: 0,
        picLink: 'pics/cleveland-icon.jpg',
        picClass: '.cleveland-pic',
        nameClass: '.cleveland-text',
        charPic: 'pics/cleveland.png',
        price: 6000,
        clickValue: -50,
        name: 'Cleveland',
    },

];

const wallpapers = [

    {
        unlocked: 1,
        price: 0,
        wpLink: 'url(pics/default.jpg)',
        picLink: 'pics/default-icon.jpg',
        picClass: '.wp-default-pic',
        nameClass: '.wp-default-text',
        name: 'Default',
    },

    {
        unlocked: 0,
        price: 1000,
        wpLink: 'url(pics/krichev.jpg)',
        picLink: 'pics/krichev-icon.jpg',
        picClass: '.wp-krichev-pic',
        nameClass: '.wp-krichev-text',
        name: 'Krichev',
    },

    {
        unlocked: 0,
        price: 10000,
        wpLink: 'url(pics/tehran.webp)',
        picLink: 'pics/tehran-icon.jpg',
        picClass: '.wp-tehran-pic',
        nameClass: '.wp-tehran-text',
        name: 'Tehran',
    },
]

let ptsCounter = 0;
let boostCost = 500;
let boostMaximizer = 1;
let activeCharacter = characters[0];

document.body.style.backgroundImage = "url(pics/default.jpg)";

document.querySelector('.boost-text').innerText = `BOOST x${boostMaximizer} ${boostCost}`;

document.querySelector('.pts-counter').innerText = ptsCounter;

let clickProcessor = () =>
{
    ptsCounter += boostMaximizer;
    document.querySelector('.pts-counter').innerText = ptsCounter;
}

let characterClickProcessor = (event) =>
{
    event.stopPropagation();
    ptsCounter += activeCharacter.clickValue*boostMaximizer;
    document.querySelector('.pts-counter').innerText = ptsCounter;
}

let boostProcessor = (event) =>
{
    event.stopPropagation();
    if (ptsCounter >= boostCost)
        {
        ptsCounter -= boostCost;
        boostCost *= 2;
        boostMaximizer += 1;
        document.querySelector('.pts-counter').innerText = ptsCounter;
        document.querySelector('.boost-text').innerText = `BOOST x${boostMaximizer} ${boostCost}`;
    }
    else
        alert('not enough points!');
}

let characterBuyProcessor = (event, person) =>
{
    event.stopPropagation();
    if(!person.unlocked)
    {
        if(ptsCounter >= person.price)
        {
            person.unlocked = 1;
            ptsCounter -= person.price;
            document.querySelector('.pts-counter').innerText = ptsCounter;
            document.querySelector(person.picClass).src = person.picLink;
            document.querySelector(person.nameClass).innerText = person.name;
        }
        else{
            alert('not enough points!');
            return;
        }
    }
    activeCharacter = person;
    document.querySelector('.character-pic').src = person.charPic;
}

let backgroundBuyProcessor = (event, background) =>
{
    event.stopPropagation();
    if(!background.unlocked)
    {
        if(ptsCounter >= background.price)
        {
            background.unlocked = 1;
            ptsCounter -= background.price;
            document.querySelector('.pts-counter').innerText = ptsCounter;
            document.querySelector(background.picClass).src = background.picLink;
            document.querySelector(background.nameClass).innerText = background.name;
        }
        else{
            alert('not enough points!');
            return;
        }
    }
    document.body.style.backgroundImage = background.wpLink;
}

let linkProcessor = (event) =>
{
    event.stopPropagation();
    window.open('https://www.instagram.com/shkafenko1/', '_blank');
}

document.querySelector('.character-pic').addEventListener('click', characterClickProcessor);

document.querySelector('.body').addEventListener('click', clickProcessor);

document.querySelector('.booster-button').addEventListener('click', boostProcessor);

document.querySelector('.insta-pic').addEventListener('click', linkProcessor);

document.querySelector('.stewie-pic').addEventListener('click', function() { characterBuyProcessor(event, characters[0]); });

document.querySelector('.peter-pic').addEventListener('click', function() { characterBuyProcessor(event, characters[1]); });

document.querySelector('.cleveland-pic').addEventListener('click', function() { characterBuyProcessor(event, characters[2]); });

document.querySelector('.wp-default-pic').addEventListener('click', function() { backgroundBuyProcessor(event, wallpapers[0]) });

document.querySelector('.wp-krichev-pic').addEventListener('click', function() { backgroundBuyProcessor(event, wallpapers[1]) });

document.querySelector('.wp-tehran-pic').addEventListener('click', function() { backgroundBuyProcessor(event, wallpapers[2]) });