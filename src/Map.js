import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { L } from "leaflet";

export default function MyMap({ level, geoJsonData, jsonData }) {
  useEffect(() => {}, [level]);
  function style(feature, level) {
    let name = "";
    let correspondingItem = "";
    name = feature.properties[`lvl${level}_name`];
    correspondingItem = jsonData.features.find(
      (item) => item.properties[`lvl${level}_name`] === name
    );

    const density = correspondingItem
      ? correspondingItem.properties.Density
      : 100;

    return {
      fillColor: getColor(density),
      weight: 1,
      color: "white",

      fillOpacity: 1,
    };
  }
  function getColor(d) {
    return d > 500
      ? "#800026"
      : d > 100
      ? "#BD0026"
      : d > 50
      ? "#E31A1C"
      : d > 20
      ? "#FC4E2A"
      : d > 5
      ? "#FD8D3C"
      : d > 3
      ? "#FEB24C"
      : d > 0
      ? "#FED976"
      : "red";
  }
  function createPopupContent(feature, level) {
    let name = "";
    let correspondingItem = "";
    name = feature.properties[`lvl${level}_name`];
    correspondingItem = jsonData.features.find(
      (item) => item.properties[`lvl${level}_name`] === name
    );

    const density = correspondingItem
      ? correspondingItem.properties.Density
      : 100;
    console.log(name);
    console.log(density);
    return `${name} - ${density}`
   
  }
  
  function handleFeatureClick(event) {
    const layer = event.target;
    const feature = layer.feature;

    const popupContent = createPopupContent(feature, level);
    layer.bindPopup(popupContent).openPopup();
  }
  return (
    <MapContainer
      center={[56, -2]}
      maxBoundsViscosity={1.0}
      minZoom={5}
      zoom={5}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png" />
      <GeoJSON
        data={geoJsonData.features}
        style={(feature) => style(feature, level)}
        onEachFeature={(feature, layer) => {
          layer.on("mouseover", function () {
           
          });
          
          layer.on("click", handleFeatureClick);
        }}
      />
    </MapContainer>
  );
}
