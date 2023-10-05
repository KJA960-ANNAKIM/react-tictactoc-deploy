import React from "react";
import "./Square.css";

const Square = ({onClick, value}) =>{
  
  return(
   <button className="square" onClick={onClick}>
      {value}
    </button>
  )
 
}
/*
const Square = (props) =>{
  
    return(
     <button className="square" onClick={()=>props.onClick()}>
        {props.value}
      </button>
    )
   
}
또는


*/
export default Square;