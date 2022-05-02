const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const telegramBtn = document.getElementById("telegram");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// loadder

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function copmlete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  copmlete();
}

//get quotes from api
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

function teleg() {
  const tgUrl = `https://web.telegram.org/k/`;
  window.open(tgUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
telegramBtn.addEventListener("click", teleg);

//on load
getQuotes();
