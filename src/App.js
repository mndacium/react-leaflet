import { useState, useEffect, useMemo } from "react";
import "./App.css";
import MyMap from "./components/Map";
import SelectLevel from "./components/SelectLevel";
import DistrictsList from "./components/DistrictsList";
function App() {
  const [level, setLevel] = useState(1);
  const [district, setDistrict] = useState();
  const [jsonData, setJsonData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  function changeLevel(value) {
    setLevel(value);
  }
  function changeDistrict(value) {
    setDistrict(value);
  }
  async function getGeoData(level) {
    try {
      setLoading(true);
      const jsonData = await fetch(
        `https://sc-test-data-uk.netlify.app/data_great_britain_${level}.json`
      );
      setJsonData(await jsonData.json());

      const geoJsonData = await fetch(
        `https://sc-test-data-uk.netlify.app/great_britain_${level}.geojson `
      );
      setGeoJsonData(await geoJsonData.json());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("Appjs rerender");
    getGeoData(level);
  }, [level]);
  const levels = useMemo(() => [1, 2], []);
  const SelectLevelComponent = useMemo(() => {
    return (
      <SelectLevel
        loading={loading}
        level={level}
        levels={levels}
        handleChange={changeLevel}
      ></SelectLevel>
    );
  }, [level, loading,levels]);
  return (
    <div className="App">
      <h2>Population density map of the UK</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginRight: "50px" }}>
          {SelectLevelComponent}

          <DistrictsList
            loading={loading}
            level={level}
            districts={geoJsonData}
            handleChange={changeDistrict}
          ></DistrictsList>
        </div>
        <div style={{ width: "650px", height: "800px" }}>
          {!loading && (
            <MyMap
              loading={loading}
              geoJsonData={geoJsonData}
              jsonData={jsonData}
              level={level}
              district={district}
              changeLevel={changeLevel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
