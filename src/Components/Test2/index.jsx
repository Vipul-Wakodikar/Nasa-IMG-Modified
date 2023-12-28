import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import data from "../MasonryLayout/data";

export function addImageHeight(array) {
    // create an array of promises
    let promises = array.map((obj) => {
      // create a new promise for each object
      return new Promise((resolve, reject) => {
        // create a new Image instance
        let img = new Image();
        // set the src property to the image URL
        img.src = obj.src;
        // add an onload event handler
        img.onload = function () {
          // get the natural height and width of the image
          let height = img.naturalHeight;
          let width = img.naturalWidth;
          // create a copy of the object and add the height and width properties
          let newObj = { ...obj, height, width };
          // resolve the promise with the new object
          resolve(newObj);
        };
        // add an onerror event handler
        img.onerror = function () {
          // reject the promise with an error message
          reject(`Failed to load image from ${obj.src}`);
        };
      });
    });
    // return a promise that resolves with an array of new objects
    return Promise.all(promises);
  }

const Test2 = () => {
  const [lambda, setLambda] = useState([]);
  

  // call the function with your data array and use the then method to handle the result
  addImageHeight(data)
    .then((newArray) => {
      // log the new array
      console.log(newArray);
      // log the first element
      setLambda(newArray);
    })
    .catch((error) => {
      // handle any error
      console.error(error);
    });

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={lambda}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <a
            href={'/worksing'}
            style={wrapperStyle}
            target="_blank"
            rel="noreferrer noopener"
          >
            {renderDefaultPhoto({ wrapped: true })}
          </a>
        )}
      />
    </>
  );
};

export default Test2;
