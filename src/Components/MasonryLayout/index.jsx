import React, { useEffect, useState } from "react";
import { addImageHeight } from "../Test2";
import PhotoAlbum from "react-photo-album";
import Modal from "./PreviewModal";
import style from "./index.module.css";

const MasonLayout = ({ url }) => {
  const [recentData, setRecentData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openCardModal = (data) => {
    setOpenModal(true);
    if (data !== modalData) {
      setModalData(data); // Update only if the data is different
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null); // Reset modal data
  };

  const fetchData = async () => {
    const recent = await fetch(url);
    const recentJson = await recent.json();
    setRecentData(recentJson);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function filterNonImageData() {
    // get the items array from the recentData object, or use an empty array if it is undefined
    const itemsArray = recentData?.collection?.items || [];
    // filter the items array by removing the elements that have the same href value as their links[0].href value
    const hrefArray = itemsArray.map((item) => ({
      ...item,
      src: item.links[0].href,
    }));
    return hrefArray;
  }

  useEffect(() => {
    addImageHeight(filterNonImageData())
      .then((newArray) => {
        setDisplayData(newArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recentData]);
  console.log("first", displayData);
  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={displayData}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => {
          return (
            <>
              <button
                className={style.cardButtonStyle}
                onClick={() => {
                  if (JSON.stringify(modalData) !== JSON.stringify(photo)) {
                    openCardModal(photo || null);
                  }
                }}
                style={wrapperStyle}
              >
                {/* {renderDefaultPhoto({ wrapped: true })} */}
                {photo.data[0].media_type === "video" && (<div
                  className={
                    photo.data[0].media_type === "video" && style.vidOverlay
                  }
                  style={wrapperStyle}
                />
                )}
                <img
                  src={photo.src}
                  alt={photo.data[0].title}
                  style={wrapperStyle}
                />
              </button>
            </>
          );
        }}
      />
      {openModal && modalData && (
        <Modal
          isOpen={openModal}
          data={modalData}
          onClose={handleCloseModal}
          appElement={document.getElementById("root")}
        />
      )}
    </>
  );
};

export default MasonLayout;
