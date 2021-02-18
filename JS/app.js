'use strict';

let totalItems = [];
let clicksAllowed = 5;  //change to 25 after complete testing 
let totalClicks = 0;
let uniqueImageCount = 6;
let indexArray = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.getElementById('button');

function AllBusMallItem (name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `./Img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  this.percentSelected = 0; 
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

function renderItems() {
  //generate 3 random index numbers and ensure they are all different
  while (indexArray.length < uniqueImageCount) {
    let randomIndex = randomIndexSelector();
    while (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex)
    }
  }

  let firstItemIndex = indexArray.shift();
  let secondItemIndex = indexArray.shift();
  let thirdItemIndex = indexArray.shift();

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

// function for event handler
function handleClick(event) {
  let itemClicked = event.target.title;
  
  if (event.target === myContainer) {
    alert('Not a valid selection.  Please click an image.')
  } else {
    for (let i = 0; i < totalItems.length; i++) {
      if (itemClicked === totalItems[i].name) {
        totalItems[i].clicks++;
        totalClicks++;
      }
    }
  }

//Event handler funtion for clicking the results button
function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
  renderResults();
  }
}

// render the results to the left side of the screen in list form
function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < totalItems.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${totalItems[i].name} had ${totalItems[i].clicks} votes, and was seen ${totalItems[i].views}`;
    myList.appendChild(li)
  }
}

  //render the results once 25 selections have been made and remove event listener
  renderItems();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderResults();
    renderChart();
  }
}


renderItems();

function renderChart() {
  let itemNames = [];
  let itemViews = [];
  let itemClicks = [];
  for (let i = 0; i < totalItems.length; i++) {
    itemNames.push(totalItems[i].name);
    itemViews.push(totalItems[i].views);
    itemClicks.push(totalItems[i].clicks);
  }
  console.log('itemNames: ', itemNames);
  console.log('itemViews', itemViews);
  console.log('itemClicks', itemClicks);
  var chartObject = {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Views',
        data: itemViews,
        backgroundColor: 'rgb(0, 204, 0)',
        borderColor: 'rgb(0, 51, 0)',
        borderWidth: 2
      },
      {
        label: 'Clicks',
        data: itemClicks,
        backgroundColor: 'rgb(0, 0, 255)',
        //borderColor: 'rgb(102, 255, 204)',
        borderWidth: 2
      }]
    },
    responsive: false,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };


  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick); 