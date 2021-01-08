const quoteContainer = document.querySelector("#quote-container");
const quoteText= document.querySelector("#quote");
const authorText= document.querySelector("#author");
const twitterBtn= document.querySelector("#twitter");
const newQuoteBtn= document.querySelector("#new-quote");
const loader = document.querySelector("#loader");


// show loading

function showLoadingIcon() {
    quoteContainer.hidden = true;
    loader.hidden = false;
 
}

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// get quote from API

async function getQuote() {
    showLoadingIcon();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
 const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
 try {
const response = await fetch (proxyUrl + apiUrl);
const data = await response.json();
// if Author blank, add 'Unknown'
if (data.quoteAuthor === ''){
    authorText.innerText = 'Unknown';
} else {
    authorText.innerText = data.quoteAuthor;
}
//Reduce font size for long quotes
if (data.quoteText.length > 120) {
    quoteText.classList.add('long-quote')

} else {
    quoteText.classList.remove('long-quote');
};

authorText.innerText=data.quoteAuthor;
quoteText.innerText = data.quoteText;
console.log(apiUrl);

complete();

 }catch (error) {
    getQuote();
 }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners 
newQuoteBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', tweetQuote);


getQuote();
