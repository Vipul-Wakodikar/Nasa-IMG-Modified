import React, { useEffect, useState, useMemo } from "react";
import style from "./index.module.css";
import Card from "../../Containers/Cards";
import Modal from "../SearchedPage/cardModal";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Slider from "../../Containers/Slider";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isPopular, setIsPopular] = useState(false);

  const searchValue = useSelector((state) => state.data.value);
  const apiVals = useSelector((state) => state.mediaType.value);

  const cache = new Map(); // Use a Map to store cached responses

  const fetchData = async (url) => {
    const cacheKey = isPopular ? "popular" : "recent";
    let data;

    try {
      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey);
        const lastModifiedDate = cachedData.lastModified;

        const response = await axios.get(url, {
          headers: {
            "If-Modified-Since": lastModifiedDate,
          },
        });

        if (response.status === 304) {
          // Resource not modified, use cached data
          data = cachedData.data;
        } else {
          // Resource modified, update cache with new data
          data = response.data;
          cache.set(cacheKey, {
            data,
            lastModified: response.headers["last-modified"],
          });
        }
      } else {
        const response = await axios.get(url, {
          cache: "no-cache",
        });

        data = response.data;
        cache.set(cacheKey, {
          data,
          lastModified: response.headers["last-modified"],
        });
      }
    } finally {
      if (isPopular) {
        window.sessionStorage.setItem(
          "popular",
          JSON.stringify(data.collection.items)
        );
      } else {
        window.sessionStorage.setItem(
          "recent",
          JSON.stringify(data.collection.items)
        );
      }
    }

    return data;
  };

  useEffect(() => {
    fetchData("https://images-assets.nasa.gov/recent.json").then((data) => {
      window.sessionStorage.setItem("recent", JSON.stringify(data.collection.items));
    });
  }, []);

  const preparedRecentData = useMemo(() => {
    const newRecentData = JSON.parse(window.sessionStorage.getItem("recent"));
    if (newRecentData) {
      return newRecentData.map((item) => ({
        ...item,
        data: item.data[0],
      }));
    }
    return [];
  }, [isPopular]); // Invalidate cache on isPopular change

  useEffect(() => {
    if (isPopular) {
      fetchData("https://images-assets.nasa.gov/popular.json").then((data) => {
        window.sessionStorage.setItem("popular", JSON.stringify(data.collection.items));
      });
    }
  }, [isPopular]); // Invalidate cache on isPopular change

  const preparedPopularData = useMemo(() => {
    const newPopularData = JSON.parse(window.sessionStorage.getItem("popular"));
    if (newPopularData) {
      return newPopularData.map((item) => ({
        ...item,
        data: item.data[0],
      }));
    }
    return [];
  }, [isPopular]); // Invalidate cache on isPopular change

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  const openCardModal = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  const TrendingButtons = () => (
    <div className={style.buttonContainer}>
      <button onClick={() => setIsPopular(false)} autoFocus>
        Newest Uploads
      </button>
      <button onClick={() => setIsPopular(true)}>Trending & Popular</button>
    </div>
  );

  const DisplayCardRender = () => {
    const cardData = isPopular ? preparedPopularData : preparedRecentData;

    return (
      <>
        {cardData &&
          cardData.map((item) => (
            <div key={item.nasa_id} className={style.outerBorder}>
              <Card key={item.nasa_id} data={item} onClick={() => openCardModal(item)} />
            </div>
          ))}
      </>
    );
  };



  return (
    <>
      <Header />
      <TrendingButtons />
      <Slider />
      <div className={style.rootCardContainer}>
        <div className={style.cardContainer}>
          <DisplayCardRender />
        </div>
      </div>
      <Modal isOpen={openModal} data={modalData} onClose={handleCloseModal} appElement={document.getElementById("root")} />
    </>
  );
};

export default HomePage;
