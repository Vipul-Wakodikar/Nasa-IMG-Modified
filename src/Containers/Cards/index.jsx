import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useSelector } from "react-redux";

const Card = ({ data, onClick }) => {
  const mediaType = useSelector((state) => state.mediaType.value);
  const searchValue = useSelector((state) => state.data.value);

  const [audioData, setAudioData] = useState();
  // console.log('dats', data)
  useEffect(() => {
    const fetchData = async () => {
      const AudioData = await fetch(data.href);
      const json = await AudioData.json();
      const previewAudio = json.find(
        (element) =>
          element.includes("orig.wav") || element.includes("128k.mp3")
      );
      setAudioData(previewAudio);
    };
    fetchData();
  }, [data]); // Update only when data changes

  return (
    <>
      {mediaType.includes("audio") && searchValue !== "" ? (
        <>
          <div>
            <audio className={style.audioWidth} controls>
              {audioData && <source src={audioData} type="audio/mp3" />}
              Your browser does not support the audio element.
            </audio>
            <h3 className={style.titleStyle}>{data.data.title}</h3>
            <p>{data.data.date_created}</p>
          </div>
        </>
      ) : (
        <>
          <button className={style.cardButtonStyle} onClick={onClick}>
            {data && data.links && data.links[0] ? (
              <img
                src={data.links[0].href || "#"}
                width="100%"
                height="160px"
                alt={data.data.title}
              />
            ) : (
              <img
                src={"#"}
                width="100%"
                height="160px"
                alt={data.data.title}
              />
            )}
            <h3 className={style.titleStyle}>{data.data.title}</h3>
            <p>{data.data.date_created}</p>
          </button>
        </>
      )}
    </>
  );
};

export default Card;
