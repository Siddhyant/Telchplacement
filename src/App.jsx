import {  useState } from 'react'
import quotes from "./assets/quote.json";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import './App.css'



const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
};

const transition = "all 1s";



function App() {
const [quote, setQuote] = useState(getRandomQuote());
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const [author, setAuthor] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState(quotes);

  const changeQuote = () => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
    setRandomColor(getRandomColor()); 
  };
  const handleInputChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleSearch = () => {
    if (author.trim() === '') {
      setFilteredQuotes([]);
    } else {
      const filtered = quotes.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));
      setFilteredQuotes(filtered);
    }
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}`;
    window.open(twitterUrl, '_blank');
};



  return (
    <div
      className="background"
      style={{ backgroundColor: randomColor, transition }}
    >
      <div id="quote-box">
        <div
          className="quote-content" style={{ color: randomColor,transition }}
        >
          <h2 id="text">
            <FaQuoteLeft size="20" className="quote-icon"/>
            {quote.quote}
            <FaQuoteRight size="20" className="quote-icon" />
          </h2>
          <h4 id="author">- {quote.author}</h4>
        </div>
        <div className="buttons">
          <button
          id="tweet-quote"
          onClick={tweetQuote}
          className="button tweet-button"
          style={{ backgroundColor: randomColor,
            marginRight:"10px",
            transition,
           }}
          >
          <FaTwitter color="white" />
          &nbsp; Tweet Quote
          </button>
          <button
            id="new-quote"
            onClick={changeQuote}
            className="button"
            style={{ backgroundColor: randomColor ,transition }}
            >
            Change Quote
          </button>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search by author"
            value={author}
            onChange={handleInputChange}
            className="search-input"
            style={{ borderColor: randomColor ,transition}}            
          />
          <button onClick={handleSearch} className="button" 
          style={{ background:randomColor,transition}}>
            search
          </button>
        </div>
        {author.trim()!== '' &&(filteredQuotes.length > 0 ?(
          <div className="quote-list">
            {filteredQuotes.map((q, index) => (
              <div key={index} className="quote-item" style={{ color: randomColor,transition }}>
                <p>
                  <FaQuoteLeft size="20"  className="quote-icon" style={{ marginRight: "10px" }}/>
                  {q.quote}
                  <FaQuoteRight size="20" className="quote-icon" style={{ marginRight: "10px" }} />
                </p> 
                <p>- {q.author}</p>
              </div>
            ))}
          </div>
        ):(<p style={{ color: randomColor }}>I dose not have a data about  Autho.</p>
        ))}
      </div>
    </div>
  );
}

export default App
