import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useRef } from "react";
import { latLngBounds } from "leaflet";
import Legend from "./Legend";

export default function MyMap({
  level,
  geoJsonData,
  jsonData,
  district,
  changeLevel,
}) {
  const mapRef = useRef(null);
  const handleMapZoomEnd = () => {
    console.log(mapRef.current.getZoom());
    if (mapRef.current.getZoom() > 7) {
      changeLevel(2);
    } else {
      changeLevel(1);
    }
  };
  useEffect(() => {
    if (mapRef.current && district) {
      const { bbox } = district;
      const bounds = latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]]);
      mapRef.current.flyToBounds(bounds);
      console.log(mapRef.current.getZoom());
    }
  }, [district]);

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
    return d > 1000
      ? "#800026"
      : d > 500
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#fffdaf";
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

    return `${name} - ${density}`;
  }

  function handleFeatureClick(event) {
    const layer = event.target;
    const feature = layer.feature;
    const bounds = layer.getBounds();
    console.log(bounds);
    if (mapRef.current) {
      mapRef.current.flyToBounds(bounds);
    }
    const popupContent = createPopupContent(feature, level);
    layer.bindPopup(popupContent).openPopup();
  }

  let center = [56, -2];
  return (
    <MapContainer
      center={center}
      minZoom={5}
      zoom={level === 1 ? 5 : 8}
      ref={mapRef}
      whenReady={(event) => event.target.on("zoomend", handleMapZoomEnd)}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON
        data={geoJsonData.features}
        style={(feature) => style(feature, level)}
        onEachFeature={(feature, layer) => {
          layer.on("click", handleFeatureClick);
        }}
      />
      <Legend getColor={getColor}></Legend>
    </MapContainer>
  );
}
