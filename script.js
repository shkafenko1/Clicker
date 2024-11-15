"use strict"

let ptsCounter = 0;
let boostCost = 500;
let boostMaximizer = 1;
let clickValue = 1;

document.querySelector('.boost-text').innerText = `BOOST x${boostMaximizer} ${boostCost}`;

document.querySelector('.pts-counter').innerText = ptsCounter;

let clickProcessor = () =>
{
    ptsCounter += clickValue*boostMaximizer;
    document.querySelector('.pts-counter').innerText = ptsCounter;
}

let characterClickProcessor = (event) =>
{
    event.stopPropagation();
    ptsCounter += clickValue*boostMaximizer*2;
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

document.querySelector('.character-pic').addEventListener('click', characterClickProcessor);

document.querySelector('.body').addEventListener('click', clickProcessor);

document.querySelector('.booster-button').addEventListener('click', boostProcessor);