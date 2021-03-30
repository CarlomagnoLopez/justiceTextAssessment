
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
  /** I added key press function to validate enter press button  */  

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      props.copyRow(props.numRow)
      e.preventDefault();
    } 

  }

  return (
    <span className={getHighlight()} contentEditable={true} suppressContentEditableWarning={true} onKeyPress={handleKeyPress}>
      {dataTex}{" "}
    </span>
  );
}

export default TextItem;
