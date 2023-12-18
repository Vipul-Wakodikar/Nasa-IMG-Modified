import React from "react";
import reactLogo from "../../assets/NotFound.png";
import style from "./index.module.css";

const NotFound = () => {
  return (
    <>
      <div
        className={style.imagePosition}
      >
        {/* <img
          src={reactLogo}
          style={{
            objectFit: "cover",
            width: "90vw",
            height: "90vh",
            overflow: "hidden",
          }}
        /> */}
        <div className={style.notFoundText}>
          <p>404 Not Found</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
