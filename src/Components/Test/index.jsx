import React, { useState, useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import shuffle from "lodash.shuffle";

import useMedia from "./useMedia";
import data from "./data";

import styles from "./index.module.css";

function Masonry() {
  function addImageHeight(array) {
    // create a new array to store the modified objects
    let newArray = [];
    // loop through each object in the array
    for (let obj of array) {
      // create a new Image instance
      let img = new Image();
      // set the src property to the image URL
      img.src = obj.css;
      // add an onload event handler
      img.onload = function () {
        // get the natural height of the image
        let height = img.naturalHeight;
        // add a new property called height to the object and assign it the image height
        obj.height = height;
        // push the object to the new array
        newArray.push(obj);
      };
    }
    // return the new array
    return newArray;
  }
  let dataWithHeight = addImageHeight(data);
  console.log(dataWithHeight);

  // call the function with your data array
  const lambda = addImageHeight(data);
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1300px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    1
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();
  // Hook3: Hold items
  const [items, set] = useState(lambda);
  // Hook4: shuffle data every 2 seconds
  // useEffect(() => {
  //   const t = setInterval(() => set(shuffle), 2000)
  //   return () => clearInterval(t)
  // }, [])
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (heights[column] += child.height / 2) - child.height / 2; // y = it's just the height of the current column
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.css,
    from: ({ x, y, width, height }) => ({
      x,
      y,
      width,
      height,
      opacity: 0,
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }),
    enter: ({ x, y, width, height }) => ({
      x,
      y,
      width,
      height,
      opacity: 1,
      display: "flex",
      justifyContent: "center",
    }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  // Render the grid
  return (
    <div>
      <div
        ref={ref}
        className={styles.list}
        style={{ height: Math.max(...heights) }}
      >
        {transitions((style, item) => (
          <a.div style={style}>
            <div
              style={{
                backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)`,
                // width: "250px",
              }}
            />
          </a.div>
        ))}
      </div>
    </div>
  );
}

export default Masonry;
