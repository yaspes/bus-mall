'use strict';

var divEl = document.getElementById('container');
var imgOne = document.getElementById('one');
var imgTwo = document.getElementById('two');
var imgThree = document.getElementById('three');
var totalClicks = 0;
//Stores all picture objects
Picture.allPics = [];
//Stores the current set of three images
Picture.currentSet = [];
//Stores the previous set of three images
Picture.lastSet = [];

//Constructor creates picture object
function Picture(name, filePath, index) {
  this.name = name;
  this.filePath = filePath;
  this.index = index;
  this.clicks = 0;
  this.views = 0;
  Picture.allPics.push(this);
}

//Instantiate all 20 pictures
new Picture('Bag', 'img/bag.jpg', 0);
new Picture('Banana', 'img/banana.jpg', 1);
new Picture('Bathroom', 'img/bathroom.jpg', 2);
new Picture('Boots', 'img/boots.jpg', 3);
new Picture('Breakfast', 'img/breakfast.jpg', 4);
new Picture('Bubblegum', 'img/bubblegum.jpg', 5);
new Picture('Chair', 'img/chair.jpg', 6);
new Picture('Cthulhu', 'img/cthulhu.jpg', 7);
new Picture('Dog-duck', 'img/dog-duck.jpg', 8);
new Picture('Dragon', 'img/dragon.jpg', 9);
new Picture('Pen', 'img/pen.jpg', 10);
new Picture('Pet-sweep', 'img/pet-sweep.jpg', 11);
new Picture('Scissors', 'img/scissors.jpg', 12);
new Picture('Shark', 'img/shark.jpg', 13);
new Picture('Sweep', 'img/sweep.png', 14);
new Picture('Tauntaun', 'img/tauntaun.jpg', 15);
new Picture('Unicorn', 'img/unicorn.jpg', 16);
new Picture('Usb', 'img/usb.gif', 17);
new Picture('Water-can', 'img/water-can.jpg', 18);
new Picture('Wine-glass', 'img/wine-glass.jpg', 19);

//Checks & returns true if picture was used in the last set of images
function isDupe(picture) {
  //Checks if this is the first set being created
  if(!Picture.lastSet[0] && !Picture.lastSet[1] && !Picture.lastSet[2]) {
    return false;
  } else if (picture === Picture.lastSet[0]) {
    return true;
  } else if (picture === Picture.lastSet[1]) {
    return true;
  } else if (picture === Picture.lastSet[2]) {
    return true;
  } else if (picture === Picture.currentSet[0]) {
    return true;
  } else if (picture === Picture.currentSet[1]) {
    return true;
  } else if (picture === Picture.currentSet[2]) {
    return true;
  } else {
    return false;
  }
}

//Puts three random pictures in currentSet array if they're not dupes
function random() {
  for(var i = 0; i < 3; i++) {
    var randomPic = Math.floor(Math.random() * Picture.allPics.length);
    var newSet = [];

    if(isDupe(Picture.allPics[randomPic])) {
      i -= 1;
      continue;
    } else {
      Picture.currentSet[i] = Picture.allPics[randomPic];
      //Adds to the image objects view property
      Picture.allPics[randomPic].views += 1;
    }
  }
}

//Displays pictures by assigning them to <img> elements
function displayImages() {
  random();
  //Adds first currentSet element to the <img> element
  imgOne.src = Picture.currentSet[0].filePath;
  imgOne.alt = Picture.currentSet[0].index;
  imgOne.title = Picture.currentSet[0].name;
  //Adds second currentSet element to the <img> element  
  imgTwo.src = Picture.currentSet[1].filePath;
  imgTwo.alt = Picture.currentSet[1].index;
  imgTwo.title = Picture.currentSet[1].name;
  //Adds third currentSet element to the <img> element
  imgThree.src = Picture.currentSet[2].filePath;
  imgThree.alt = Picture.currentSet[2].index;
  imgThree.title = Picture.currentSet[2].name;
  //Transferes currentSet -> lastSet, then clears the currentSet array
  /*
  
  */
}

function displayResults() {
  divEl.innerHTML = '';
  var ulEl = document.createElement('ul');
  var liEl;

  for(var i = 0; i < Picture.allPics.length; i++) {
    var name = Picture.allPics[i].name;
    var clicks = Picture.allPics[i].clicks;
    liEl = document.createElement('li');
    liEl.textContent = name + ': clicks = ' + clicks;
    divEl.appendChild(liEl);
  }
}

function clickHandler(e) {

  if(totalClicks < 25) {
    //Stores which <img> element got clicked within the container
  
    if(e.target != divEl) {
      Picture.allPics[e.target.alt].clicks += 1;
      totalClicks++;
      console.log(e.target.alt);
      displayImages();
      Picture.lastSet[0] = Picture.currentSet[0];
      Picture.lastSet[1] = Picture.currentSet[1];
      Picture.lastSet[2] = Picture.currentSet[2];
      Picture.currentSet = [];
    }
  } else {
    //divEl.removeEventListener();
    displayResults();
  }  
}

divEl.addEventListener('click', clickHandler);
displayImages();