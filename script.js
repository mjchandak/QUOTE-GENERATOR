let apiQuotes = [];
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quotes");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const nweQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function laoding() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuotes() {
  laoding();
  let quotes = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  if (!quotes.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quotes.author;
  }
  if (quotes.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quotes.text;
  complete();
}
//get quotes from api
async function getQuotes() {
  laoding();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const responce = await fetch(apiUrl);
    apiQuotes = await responce.json();

    console.log(apiQuotes[12]);
    newQuotes();
  } catch (error) {
    //catch error
  }
}

function tweetQuotes() {
  const twitterUrl = `https://twitter.com/intent/tweet?text${quoteText.textContent}  - ${authorText.textContent}`;
  window.open(twitterUrl, "-blank");
}
nweQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuotes);

getQuotes();

