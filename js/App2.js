const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const API_TOKEN = "82a2e4e4bfa6f59d54a177cd";

for (let select of dropdowns) {
  for (const currCode in CountryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `https://v6.exchangerate-api.com/v6/${API_TOKEN}/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rates[toCurr.value];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  console.log(finalAmount);
};

const swapIcon = document.querySelector(".icon i");

swapIcon.style.cursor = "pointer"; // Make it look clickable

swapIcon.addEventListener("click", () => {
  // Swap the selected values
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  // Update the flags
  updateFlag(fromCurr);
  updateFlag(toCurr);

  // Update the exchange rate
  updateExchangeRate();
});

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = CountryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
