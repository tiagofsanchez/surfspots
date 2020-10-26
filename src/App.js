import React from "react";
import SurfSpotMaps from "../src/components/surfSpotMap";

import "./App.css";

function App() {
  return (
    <main className="App">
      <h1 style={{ color: `#d23669`, margin: `0px`, padding: `40px` }}>
        Just Playing With Maps
      </h1>
      <p>
        Mapping some of my favorite surf spots using{" "}
        <span style={{ fontWeight: `bold`, color: `#d23669` }}>
          react-leaflet
        </span>
      </p>
      <br />
      <SurfSpotMaps />
    </main>
  );
}

export default App;
