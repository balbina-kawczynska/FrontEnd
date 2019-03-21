'use strict';

//initialize drawing on canvas and opening an image
window.onload = () => {
    drawImage();
    filePath.addEventListener('change', openFile);
};

//get reference to the canvas object
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

//create new html image element
let img = new Image();

//open new image
var filePath = document.getElementById('buttonOpenFile');
function openFile() {
    var url = URL.createObjectURL(filePath.files[0]);
    img.src = url;
}

//draw image on canvas
function drawImage() {
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

//=============================================================
//TO DO - create array
// var filtersArray = [ 'brightness', 'contrast', 'saturate', 
//     'sepia', 'blur', 'shadow', 'grayscale'];
// var filterValue = 0;
// var filterValueName = '';
// function getFilterValue() {
//     var filter = arguments[0];
//     filterValue = Number(document.getElementById(filter).value);
//     filterValueName = `${filter}` + 'Value';
// }
//=============================================================

//apply filter to an image
function applyFilter() {
    //get current input values
    var currentInputValue = Number(arguments[0]);
    var currentFilterName = String(arguments[1]);

    //get values of different filters
    //=============================================================
    // let currentFilterValue = getFilterValue(currentFilterName);
    // filtersArray.forEach(currentFilterValue);

    // ctx.filter = `${filter}(${filterValue}%)`;
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);   

    //=============================================================
    //working long version
    //=============================================================
    var brightnessValue = Number(document.getElementById('brightness').value),
        contrastValue = Number(document.getElementById('contrast').value),
        saturationValue = Number(document.getElementById('saturate').value),
        sepiaValue = Number(document.getElementById('sepia').value),
        blurValue = Number(document.getElementById('blur').value),
        shadowValue = Number(document.getElementById('shadow').value),
        grayscaleValue = Number(document.getElementById('grayscale').value),
        hueRotateValue = Number(document.getElementById('hueRotate').value),
        invertValue = Number(document.getElementById('invert').value),
        opacityValue = Number(document.getElementById('opacity').value);

    //apply filters and refresh to get filtered image 
    ctx.filter = `brightness(${brightnessValue}%)\n` +
        `contrast(${contrastValue}%)\n` +
        `saturate(${saturationValue}%)\n` +
        `sepia(${sepiaValue}%)\n` + 
        `blur(${blurValue}px)\n` +
        `drop-shadow(black ${shadowValue}px ${shadowValue}px ${shadowValue}px)\n` +
        `grayscale(${grayscaleValue}%)\n` +
        `hue-rotate(${hueRotateValue}deg)\n` +
        `invert(${invertValue}%)\n` +
        `opacity(${opacityValue}%)\n`;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //=============================================================

    //show value of specific filter
    document.getElementById(currentFilterName + 'Value').innerHTML = currentInputValue;
}

//=============================================================
// Ideas
//=============================================================
// - accepting only image extensions in file reader
//=============================================================
// ...
//=============================================================
// - reset filters from canvas
//=============================================================
// buttonResetFilters.addEventListener('change', resetFilters);
//
// var buttonResetFilters = document.getElementById('buttonResetFilters');
// function resetFilters() {
// }
//=============================================================
// - canvas container resizing
//=============================================================
// requestAnimationFrame(renderLoop);
//
//canvas container resizing
// function renderLoop(){
//     let innerWidth = document.getElementById('content').width;
//     let innerHeight = document.getElementById('content').height;
//     if(canvas.width !== innerWidth || canvas.height !== innerHeight) {
//         ctx.drawImage(canvas, innerWidth, innerHeight);
//     }    
//     requestAnimationFrame(renderLoop);
// }