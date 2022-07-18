'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data) {
  const html = `<article class="country">
  <img class="country__img" src="${data.flags}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0]}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0]}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryDataAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      console.log(this.responseText);
    });
  });
};

getCountryDataAndNeighbour('india');
getCountryDataAndNeighbour('usa');

const request = fetch(`https://restcountries.com/rest/v2/india`);
console.log(request);

const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  });
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/rest/v2/${country}`)
    .then(function (response) {
      console.log(response);

      if (!response.ok) throw new Error('Country not found');

      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(err => alert(err));
};

getCountryData('india');

btn.addEventListener('click', function () {
  getCountryData('india');
});

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

console.log('Test start');
setTimeout(() => console.log(`0 sec timer`), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log(`Test end`);

Promise.resolve(`Resolved promise 2`).then(res => {
  for (let i = 0; i < 100000; i++) {}
  console.log(res);
});

const lotteryPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve(`You Win`);
    } else {
      reject(`You lost your money`);
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log(`I waited for 2 seconds`);
    return wait(1);
  })
  .then(() => console.log(`I waited for 1 second`));

navigator.geolocation.getCurrentPosition(position => console.log());
