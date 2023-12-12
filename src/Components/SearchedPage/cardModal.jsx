import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import ReactModal from "react-modal";

const cardModal = ({ isOpen, data, onClose, appElement, key }) => {
  const [vidData, setVidData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const vidData = await fetch(data.href);
      const json = await vidData.json();
      const previewMP4 = json.find(
        (element) =>
          element.includes("orig.mp4") || element.includes("preview.mp4")
      );
      setVidData(previewMP4);
    };
    fetchData();
  }, [data]); // Update only when data changes
  if (!isOpen) return null;

  const RenderVideoData = () => (
    <>
      {vidData && (
        <div>
          <div className={style.videoContainer}>
            <video
              className={style.hdImgStyle}
              poster={data.links[0].href || "#"}
              controls
            >
              <source src={vidData} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div key={data.data.nasa_id}>
            <h3>{data.data.title}</h3>
            <p>Date Created: {data.data.date_created || "Not Found"}</p>
            <p>Nasa Id: {data.data.nasa_id || "Not Found"}</p>
            {data.data.keywords &&
              data.data.keywords.map((keyword) => (
                <div key={keyword}>{keyword}</div> // Use keyword as unique key for keyword divs
              ))}
            <p
              dangerouslySetInnerHTML={{
                __html: `${data.data.description || "Not Found"}`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );

  const RenderImageData = () => (
    <>
      {data && !vidData && (
        <>
          <div key={data.data.nasa_id} className={style.modalContent}>
            <img
              src={data.links[0].href || "#"}
              alt={data.data.title}
              className={style.hdImgStyle}
            />
            <div key={data.data.nasa_id}>
              <h3>{data.data.title}</h3>
              <p>Date Created: {data.data.date_created || "Not Found"}</p>
              <p>Nasa Id: {data.data.nasa_id || "Not Found"}</p>
              {data.data.keywords &&
                data.data.keywords.map((keyword) => (
                  <div key={keyword}>{keyword}</div> // Use keyword as unique key for keyword divs
                ))}
              <p
                dangerouslySetInnerHTML={{
                  __html: `${data.data.description || "Not Found"}`,
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <ReactModal isOpen={isOpen} appElement={appElement} key={key}>
      <div className={style.closeButton}>
        <button onClick={onClose}>X</button>
      </div>
      <RenderVideoData />
      <RenderImageData />
    </ReactModal>
  );
};

export default cardModal;
