import React, { useState } from "react";
import MasonLayout from "../MasonryLayout";
import style from './index.module.css'

const HomePage = () => {
  const [isPopular, setIsPopular] = useState(false);

  const TrendingButtons = () => (
    <div className={style.buttonContainer}>
      <button onClick={() => setIsPopular(false)} autoFocus>
        Newest Uploads
      </button>
      <button onClick={() => setIsPopular(true)}>Trending & Popular</button>
    </div>
  );
    console.log('first', isPopular)
  return (
    <>
      <TrendingButtons />
      {isPopular ? (
        <MasonLayout url="https://images-assets.nasa.gov/popular.json" />
      ) : (
        <>
          <MasonLayout url="https://images-assets.nasa.gov/recent.json" />
        </>
      )}
    </>
  );
};

export default HomePage;
