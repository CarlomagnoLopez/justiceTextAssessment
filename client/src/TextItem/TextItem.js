
import React, { useState } from 'react';
import "./TextItem.css";

/** Component for each word controlling highlight state. */
function TextItem(props) {

  const [dataTex, setDataText] = useState(props.data.text)

  const getHighlight = () => {
    if ((Math.floor(props.data.info.start / 2000) % props.value) === 0) {
      return "highlight"
    }
    return ""
  }
  const handleKeyPress = e => {
    // console.log(e.key)
    // let newData = "";
    if (e.key === "Enter") {
      props.copyRow(props.numRow)
      e.preventDefault();
    } 
    // else {
    //   newData = e.currentTarget.innerHTML;
    //   setDataText(newData)
    // }

  }

  // const changeValue = e => {
  //   console.log(e.target.value)
  // }

  return (
    <span className={getHighlight()} contentEditable={true} suppressContentEditableWarning={true} onKeyPress={handleKeyPress}>
      {dataTex}{" "}
    </span>
  );
}

export default TextItem;
