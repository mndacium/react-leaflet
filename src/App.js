import { useState, useEffect } from "react";
import "./App.css";
import MyMap from "./Map";
import SelectLevel from "./SelectLevel";
import SelectDistrict from "./SelectDistrict";
function App() {
  let levels = [1, 2];
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
  if (loading) return <h1>Loading...</h1>;
  if (!loading)
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
            <SelectDistrict
              level={level}
              districts={geoJsonData}
            
              handleChange={changeDistrict}
            ></SelectDistrict>
          </div>

          <div style={{ width: "650px", height: "800px" }}>
            <MyMap
              geoJsonData={geoJsonData}
              jsonData={jsonData}
              level={level}
              district={district}
            />
          </div>
        </div>
      </div>
    );
}

export default App;
