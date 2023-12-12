import React, { useEffect, useState, useMemo } from "react";
import style from "./index.module.css";
import Card from "../../Containers/Cards";
import Modal from "./cardModal";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../../features/data/dataSlice";

const SearchedPage = () => {
  const [cardData, setCardData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Store data for modal

  const searchValue = useSelector((state) => state.data.value);
  const mediaType = useSelector((state) => state.mediaType.value);
  const dispatch = useDispatch();

  const fetchData = async () => {
    let fetchUrl = `https://images-api.nasa.gov/search?q=newest&media_type=${mediaType}`;
    if (searchValue) {
      fetchUrl = `https://images-api.nasa.gov/search?q=${searchValue}&media_type=${mediaType}`;
    }
    const api_url = await fetch(fetchUrl);
    const jsonData = await api_url.json();
    setCardData(jsonData.collection.items);
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, mediaType]);

  const preparedData = useMemo(() => {
    return cardData.map((item) => ({
      ...item,
      data: item.data[0], // Flatten nested data
    }));
  }, [cardData]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null); // Reset modal data
  };

  const openCardModal = (data) => {
    setOpenModal(true);
    setModalData(data); // Store clicked card data
  };

  const PathRender = () => (
    <>
      <div className={style.rootCardContainer}>
        <p>
          <a href="" onClick={() => dispatch(updateSearch(""))}>Home</a> &gt;&gt; {searchValue}
        </p>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <PathRender />
      {cardData && cardData.length > 0 ? (
        <>
          <div className={style.rootCardContainer}>
            <div className={style.cardContainer} key={preparedData.length}>
              {preparedData &&
                preparedData.map((item) => (
                  <div key={item.nasa_id} className={style.outerBorder}>
                    <Card
                      key={item.nasa_id} // Use item.nasa_id as unique key
                      data={item}
                      onClick={() => openCardModal(item)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <h3 className={style.rootCardContainer} style={{ height: "100vh" }}>
          No such data found please try with other text
        </h3>
      )}
      <Modal
        isOpen={openModal}
        data={modalData}
        onClose={handleCloseModal}
        appElement={document.getElementById("root")}
      />
    </>
  );
};

export default SearchedPage;
