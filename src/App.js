import { useState, useEffect } from "react";
import "./App.css";
import MyMap from "./Map";
import SelectLevel from "./SelectLevel";
function App() {
  let levels = [1, 2];
  const [level, setLevel] = useState(1);
  const [jsonData, setJsonData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  function changeLevel(value) {
    setLevel(value);
  }
  async function getGeoData(level) {
    try {
      setLoading(true)
      const jsonData = await fetch(
        `https://sc-test-data-uk.netlify.app/data_great_britain_${level}.json`
      );
      setJsonData(await jsonData.json());

      const geoJsonData = await fetch(
        `https://sc-test-data-uk.netlify.app/great_britain_${level}.geojson `
      );
      setGeoJsonData(await geoJsonData.json());
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("Appjs rerender")
    getGeoData(level);
  }, [level]);

  return (
    <div className="App">
      <h2>Population density map of the UK</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginRight: "50px" }}>
          <SelectLevel
            level={level}
            levels={levels}
            handleChange={changeLevel}
          ></SelectLevel>
        </div>

        <div style={{ width: "650px", height: "800px" }}>
          {!loading && (
            <MyMap
              geoJsonData={geoJsonData}
              jsonData={jsonData}
              level={level}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
