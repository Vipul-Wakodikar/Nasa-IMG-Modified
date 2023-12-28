import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import HeaderModal from "./HeaderModal";
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../../features/data/dataSlice";
import { setMediaType } from "../../features/data/mediaTypeSlice";

const Header = () => {
  const [cardData, setCardData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Store data for modal
  const [searchData, setSearchData] = useState("random");
  const [selectMediaType, setSelectMediaType] = useState("image");

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.data.value);

  const fetchData = async () => {
    // const api_url = await fetch(
    //   `${import.meta.env.VITE_APOD_APIURL}${
    //     import.meta.env.VITE_NASA_SECRET_KEY
    //   }`
    // );
    const api_url = await fetch("http://localhost:5000/apod")
    const jsonData = await api_url.json();
    setCardData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCardModal = (data) => {
    setOpenModal(true);
    setModalData(data); // Store clicked card data
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null); // Reset modal data
  };

  const RadioMediaButtons = () => {
    const handleMediaChange = (event) => {
      setSelectMediaType(event.target.value); // Update local state
      dispatch(setMediaType({ mediaType: event.target.value })); // Dispatch action with selected media type
    };

    return (
      <div className={style.mediaType}>
        <label>
          <input
            type="radio"
            name="mediaType"
            value="image"
            checked={selectMediaType === "image"}
            onChange={handleMediaChange}
          />
          Image
        </label>

        <label>
          <input
            type="radio"
            name="mediaType"
            value="video"
            checked={selectMediaType === "video"}
            onChange={handleMediaChange}
          />
          Video
        </label>

        <label>
          <input
            type="radio"
            name="mediaType"
            value="audio"
            checked={selectMediaType === "audio"}
            onChange={handleMediaChange}
          />
          Audio
        </label>
      </div>
    );
  };

  return (
    <>
      <header className={`${style.header} ${style.headerBackground}`}>
        <div>
          <div className={style.searchBar}>
            <input
              type="text"
              onChange={(e) => setSearchData(e.target.value)}
              defaultValue={searchValue}
            />
            <button
              onClick={() => dispatch(updateSearch(searchData))}
              style={{ width: "25%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </div>
          <div className={style.header}>
            <button onClick={() => openCardModal(cardData)}>
              Picture of the day
            </button>
            <RadioMediaButtons />
          </div>
        </div>
        <HeaderModal
          isOpen={openModal}
          data={modalData} // Use stored modal data
          onClose={handleCloseModal}
          appElement={document.getElementById("root")}
        />
      </header>
    </>
  );
};

export default Header;
