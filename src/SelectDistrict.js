import { useState } from "react";
import "./App.css";
export default function SelectDistrict({ districts, level, handleChange }) {
  return (
    <div>
      {districts.features.map((item, index) => {
        return (
          <p
            key={index}
            style={{
              fontSize: `20px`,
              background: `#D3D3D3`,
            }}
            className="button"
            onClick={() => handleChange(item)}
          >{`District ${item.properties[`lvl${level}_name`]}`}</p>
        );
      })}
    </div>
  );
}
