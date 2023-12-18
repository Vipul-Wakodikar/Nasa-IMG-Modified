import React from "react";
import style from "./index.module.css";
import ReactModal from "react-modal";
import notFound from "../../assets/Image404NotFound.jpg";

const HeaderModal = ({ isOpen, data, onClose, appElement }) => {
  if (!isOpen) return null;
  return (
    <ReactModal isOpen={isOpen} appElement={appElement}>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
      <div className={style.modalContent}>
        {data && (
          <>
            <div>
              <img src={data.hdurl || notFound} alt={data.title} className={style.hdImgStyle} />
            </div>
            <div>
              <h3>{data.title}</h3>
              <p>Date Created: {data.date || "Not Found"}</p>
              <p>Description: {data.explanation || "Not Found"}</p>
            </div>
          </>
        )}
      </div>
    </ReactModal>
  );
};

export default HeaderModal;
