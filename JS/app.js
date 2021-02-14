'use strict';

const totalItems = [];
const clicksAllowed = 5; //Change to 25 after testing
const imageOne = document.querySelector('section image:first-child')
const imageTwo = document.querySelector('section image:nth-child(2)')
const imageThree = document.querySelector('section image:nth-child(3)')


function AllBusMallItem (name, fileType, timesDisplayed = 0) {
  this.name = name;
  this.fileType = fileType;
  this.timesDisplayed = 0;
  this.src = `${name}.${fileType}`;
  this.timesClicked = 0;
  this.percentSelected = function () {
    let percentSelectedFormula = this.timesDisplayed/this.timesClicked + "%" + "chosen";
    return percentSelectedFormula;
  };  
  totalItems.push(this);
}

let bag = new AllBusMallItem ('bag', 'jpg');
let banana = new AllBusMallItem ('banana', 'jpg');
let bathroom = new AllBusMallItem ('bathroom', 'jpg');
let boots = new AllBusMallItem ('boots', 'jpg');
let breakfast = new AllBusMallItem ('breakfast', 'jpg');
let bubblegum = new AllBusMallItem ('bubblegum', 'jpg');
let chair = new AllBusMallItem ('chair', 'jpg');
let cthulhu = new AllBusMallItem ('cthulhu', 'jpg');
let dogduck = new AllBusMallItem ('dog-duck', 'jpg');
let dragon = new AllBusMallItem ('dragon', 'jpg');
let pen = new AllBusMallItem ('pen', 'jpg');
let petsweep = new AllBusMallItem ('pet-sweep', 'jpg');
let scissors = new AllBusMallItem ('scissors', 'jpg');
let shark = new AllBusMallItem ('shark', 'jpg');
let sweep = new AllBusMallItem ('sweep', 'png');
let tauntaun = new AllBusMallItem ('tauntaun', 'jpg');
let unicorn = new AllBusMallItem ('unicorn', 'jpg');
let usb = new AllBusMallItem ('usb', 'gif');
let watercan = new AllBusMallItem ('water-can', 'jpg');
let wineglass = new AllBusMallItem ('wine-glass', 'jpg');

//generate random index number to display the items
function randomIndexSelector() {
  let randomIndex = Math.floor(Math.random() * (totalItems.length));
  return randomIndex;
}

//Generate 3 random items in an array and make sure that they are not the same
function displayItems () {
  let firstItem = totalItems[randomIndexSelector()];
  let secondItem = totalItems[randomIndexSelector()];
  let thirdItem = totalItems[randomIndexSelector()];
  let threeTotalItems = []
  while (firstItem === secondItem || secondItem === thirdItem) {
    firstItem = totalItems[randomIndexSelector()];
    secondItem = totalItems[randomIndexSelector()];
    thirdItem = totalItems[randomIndexSelector()];
  }
  for (let i = 0; i < 3; i++) {
    let comparedItems = firstItem
  }
  return comparedItems;
}

//Append the 3 items to the DOM
console.log(displayItems())

