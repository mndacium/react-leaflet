import { useState } from "react";
import "./App.css"
export default function SelectLevel({ levels, level, handleChange }) {
  const [opened,setOpened]=useState(true)
  return (
    <div>
    
      <div style={{background:"grey" }} className="button" onClick={()=>setOpened(!opened)}><h3>Select {opened ? (
        <span>close</span>
      ):(
        <span>open</span>
      )}</h3> 
      
      
      </div>
     
      <div style={{display:`${opened ? "" : "none"}`}}> {levels.map((item,index) => {
        return <p key={index} style={{fontSize:`${level===item ? "20px":"18px"}` , background:`${level===item ? "#D3D3D3":""}`}} className="button" onClick={()=>handleChange(item)}>{`Level ${item}`}</p>;
      })}</div>
     
    </div>
  );
}
