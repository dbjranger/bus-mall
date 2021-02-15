'use strict';

let totalItems = [];
let clicksAllowed = 5; //Change to 25 after testing
let totalClicks = 0;
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('section div');

function AllBusMallItem (name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  this.percentSelected = function () {
    return this.views/this.clicks + `% click rate`;
  };  
  totalItems.push(this);
}

let bag = new AllBusMallItem ('bag');
let banana = new AllBusMallItem ('banana');
let bathroom = new AllBusMallItem ('bathroom');
let boots = new AllBusMallItem ('boots');
let breakfast = new AllBusMallItem ('breakfast');
let bubblegum = new AllBusMallItem ('bubblegum');
let chair = new AllBusMallItem ('chair');
let cthulhu = new AllBusMallItem ('cthulhu');
let dogduck = new AllBusMallItem ('dog-duck');
let dragon = new AllBusMallItem ('dragon');
let pen = new AllBusMallItem ('pen');
let petsweep = new AllBusMallItem ('pet-sweep');
let scissors = new AllBusMallItem ('scissors');
let shark = new AllBusMallItem ('shark');
let sweep = new AllBusMallItem ('sweep', 'png');
let tauntaun = new AllBusMallItem ('tauntaun');
let unicorn = new AllBusMallItem ('unicorn');
let usb = new AllBusMallItem ('usb', 'gif');
let watercan = new AllBusMallItem ('water-can');
let wineglass = new AllBusMallItem ('wine-glass');

//generate random index number to display the items
function randomIndexSelector() {
 return Math.floor(Math.random() * (totalItems.length));
}

// create a render function that will daisy chain everything together
// so that it can be called in a single function.
function renderItems() {
  //generate 3 random index numbers and ensure they are all different
  let firstItemIndex = randomIndexSelector();
  let secondItemIndex = randomIndexSelector();
  let thirdItemIndex = randomIndexSelector();
  while (firstItemIndex === secondItemIndex) {
    secondItemIndex = randomIndexSelector();
  } 
  while (secondItemIndex === thirdItemIndex) {
    thirdItemIndex = randomIndexSelector();
  }

  //add src to images, give them a title, track the views
  imageOne.src = totalItems[firstItemIndex].src;
  imageOne.title = totalItems[firstItemIndex].name;
  totalItems[firstItemIndex].views++;

  imageTwo.src = totalItems[secondItemIndex].src;
  imageTwo.title = totalItems[secondItemIndex].name;
  totalItems[secondItemIndex].views++;

  imageThree.src = totalItems[thirdItemIndex].src;
  imageThree.title = totalItems[thirdItemIndex].name;
  totalItems[thirdItemIndex].views++;
}

// render the results to the left side of the screen in list form
function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < totalItems.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${totalItems[i].name} had ${totalItems[i].clicks} votes (${totalItems[i].percentSelected})`;
    myList.appendChild(li)
  }
}

// function for event handler
function handleClick(event) {
  if (event.target === myContainer) {
    alert('Not a valid selection.  Please click an image.')
  }

  totalClicks++;
  let itemClicked = event.target.title;

  for (let i = 0; i < totalItems.length; i++) {
    if (itemClicked === totalItems[i].name) {
      totalItems[i].clicks++;
    }
  }

  //render the results once 25 selections have been made and remove event listener
  renderItems();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
    renderResults();
  }
}

renderItems();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick); 