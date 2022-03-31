// Get Vars
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch Exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();

// Language setting
const langEl = document.querySelector('.langWrap');
const link = document.querySelectorAll('a');
const titleEl = document.querySelector('.title');
const descrEl = document.querySelector('.description');
const langSwapEl = document.querySelector('.langSwap');

link.forEach(eL => {
  eL.addEventListener('click', () => {
    langEl.querySelector('.active').classList.remove('active');
    eL.classList.add('active');

    const attr = eL.getAttribute('language');

    titleEl.textContent = languageData[attr].title;
    descrEl.textContent = languageData[attr].description;
  });
});

const languageData = {
  "english": {
    "title": "Exchange Rate Calculator",
    "description": "Choose the currency and amount to get the exchange rate",
  },
  "arabic": {
    "title": "حاسبة تحويل العملات",
    "description": "اختار العملة والقيمة المراد تحويلها",
  },
};
