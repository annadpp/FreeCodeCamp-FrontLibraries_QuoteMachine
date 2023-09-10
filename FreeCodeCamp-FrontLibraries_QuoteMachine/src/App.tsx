import { useState } from "react";
import quotes from "./assets/quotes.json";
import { FaTwitter, FaRandom } from "react-icons/fa";
import "./App.css";

//interfaces TS define structure of objects -> gets 2 properties from quotes.json
interface Quote {
  quote: string;
  author: string;
}

//function without parameters + returns Quote interface + randomizes return from quotes.json
const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

//randomizes color based on RGB (*128 to keep it dark)
const getRandomColor = (): string => {
  const hue = Math.floor(Math.random() * 360); // Generate a random hue value (0-359)
  const saturation = 50 + Math.floor(Math.random() * 51); // Generate a random saturation (50-100)
  const lightness = 10 + Math.floor(Math.random() * 11); // Generate a random lightness (10-30)

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getRandomColorFont = (): string => {
  const backgroundColor = getRandomColor();
  const backgroundHue = parseInt(backgroundColor.match(/\d+/)![0], 10); // Extract hue value
  const complementaryHue = (backgroundHue + 180) % 360; // Calculate complementary hue

  return `hsl(${complementaryHue}, 100%, 80%)`; // Use 100% saturation and 75% lightness for font color
};

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState<Quote>(getRandomQuote());
  const [randomColor, setRandomColor] = useState<string>(getRandomColor());
  const [randomColorFont, setRandomColorFont] = useState<string>(
    getRandomColorFont()
  );

  //changeQuote on click triggers getRandomQuote + getRandomColor
  const changeQuote = () => {
    setQuote(getRandomQuote());
    setRandomColor(getRandomColor());
    setRandomColorFont(getRandomColorFont());
  };

  return (
    <div
      className="background"
      style={{ backgroundColor: randomColor, transition }}
    >
      <div id="quote-box">
        <div
          className="quote-content"
          style={{ color: randomColorFont, transition }}
        >
          <h1>RANDOM QUOTE MACHINE</h1>
          <h2 id="text">“{quote.quote}”</h2>
          <h4 id="author">{quote.author.toUpperCase()}</h4>
        </div>
        <div className="buttons">
          <button>
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}`}
              id="tweet-quote"
            >
              <FaTwitter
                style={{
                  color: randomColorFont,
                  transition,
                  fontSize: "calc(1em + 0.5vw)",
                }}
              />
            </a>
          </button>
          <button id="new-quote" onClick={changeQuote}>
            <FaRandom
              style={{
                color: randomColorFont,
                transition,
                fontSize: "calc(1em + 0.5vw)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
