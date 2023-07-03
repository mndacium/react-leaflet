import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "./legend.css";
const Legend = ({ getColor }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const createLegend = () => {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.classList.add("legend");
        const levels = [0, 10, 20, 50, 100, 200, 500, 1000];

        for (let i = 0; i < levels.length; i++) {
          const from = levels[i];
          const to = levels[i + 1];
          const color = getColor(from + 1);
          const label = to ? `${from}-${to}` : `${from}+`;

          div.innerHTML += `<div style="display:flex; justify-content:start;"><i style="background:${color}; display:inline-block; width:20px; height:20px; margin-right:10px;"></i><span>${label}</span></div>`;
        }

        return div;
      };

      legend.addTo(map);
      return legend;
    };

    const legend = createLegend();

    return () => {
      if (legend) {
        legend.remove();
      }
    };
  }, [map, getColor]);

  return null;
};

export default Legend;
