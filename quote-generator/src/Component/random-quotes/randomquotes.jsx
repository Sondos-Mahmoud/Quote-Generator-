import React, { useState, useEffect } from 'react';
import './randomquotes.css';
import { IoReload } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const RandomQuotes = () => {
    const [quote, setQuote] = useState({
        text: "Click reload to get a quote!",
        author: "Anonymous",
    });
    const [quotes, setQuotes] = useState([]);

    // Fetch the quotes once when the component mounts
    useEffect(() => {
        async function loadQuotes() {
            try {
                const response = await fetch("https://type.fit/api/quotes");
                if (!response.ok) {
                    throw new Error('Failed to fetch quotes');
                }
                const quotesData = await response.json();
                setQuotes(quotesData);
            } catch (error) {
                console.error(error.message);
            }
        }
        loadQuotes();
    }, []);

    const random = () => {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
        }
    };
const tiwtter=()=>{
    window.open(`https://twitter.com/intnet/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
}
    return (
        <div className='Container'>
            <div className="quote">
                {quote.text}
            </div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">{quote.author.split(',')[0]}</div>
                    <div className="icons">
                        <IoReload className='reload' onClick={random()} />
                        <FaXTwitter className='tiwtter' onClick={()=>{tiwtter()}} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomQuotes;
