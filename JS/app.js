'use strict';

let totalItems = [];
let clicksAllowed = 25;  
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

// Retrieving From Local Storage
// 1. get the data from local storage using its key
let retrievedItems = localStorage.getItem('items');

if(retrievedItems){
  let parsedItems = JSON.parse(retrievedItems);
  totalItems = parsedItems;
} else {
  new AllBusMallItem ('bag');
  new AllBusMallItem ('banana');
  new AllBusMallItem ('bathroom');
  new AllBusMallItem ('boots');
  new AllBusMallItem ('breakfast');
  new AllBusMallItem ('bubblegum');
  new AllBusMallItem ('chair');
  new AllBusMallItem ('cthulhu');
  new AllBusMallItem ('dog-duck');
  new AllBusMallItem ('dragon');
  new AllBusMallItem ('pen');
  new AllBusMallItem ('pet-sweep');
  new AllBusMallItem ('scissors');
  new AllBusMallItem ('shark');
  new AllBusMallItem ('sweep', 'png');
  new AllBusMallItem ('tauntaun');
  new AllBusMallItem ('unicorn');
  new AllBusMallItem ('usb', 'gif');
  new AllBusMallItem ('water-can');
  new AllBusMallItem ('wine-glass');
 }


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

  //render the results once 25 selections have been made and remove event listener
  renderItems();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    //1. Stringify the data
    let stringifiedItems = JSON.stringify(totalItems);
    //2. Save to local storage
    localStorage.setItem('items', stringifiedItems)
  }
}

function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
  renderResults();
  renderChart();
  myButton.removeEventListener('click', handleButtonClick);
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