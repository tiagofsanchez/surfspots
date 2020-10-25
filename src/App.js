import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import useSwr from "swr";
import "./App.css";

const fetcher = (...args) => fetch(...args).then((resp) => resp.json());

function App() {
  const [activeSpot, setActiveSpot] = React.useState(null);

  const url =
    "https://spreadsheets.google.com/feeds/list/1Dk1KD6ldix8ZEMJNa4evmrl2MJeFM5g6g9Cxis-oPjc/1/public/full?alt=json";
  const { data, error } = useSwr(url, { fetcher });

  const surf = data && !error ? data : null;

  let surfSpots = null;
  if (surf !== null) {
    surfSpots = surf.feed.entry;
  }

  return (
    <main className="App">
      <h1 style={{ color: `#d23669`, margin: `0px`, padding: `40px` }}>
        Just Playing With Maps
      </h1>
      <p>
        Mapping some of my favorite surf spots on{" "}
        <span style={{ fontWeight: `bold`, color: `#d23669` }}>
          react-leaflet
        </span>
      </p>
      <br />
      <Map center={[39.3558, -9.345]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {surfSpots &&
          surfSpots.map((spot) => {
            return (
              <Marker
                opacity={10}
                key={spot.gsx$name.$t}
                position={[spot.gsx$la.$t, spot.gsx$lon.$t]}
                onClick={() => setActiveSpot(spot)}
              ></Marker>
            );
          })}

        {activeSpot && (
          <Popup
            position={[activeSpot.gsx$la.$t, activeSpot.gsx$lon.$t]}
            onClose={() => setActiveSpot(null)}
          >
            <div>
              <h1>{activeSpot.gsx$name.$t}</h1>
            </div>
          </Popup>
        )}
      </Map>
    </main>
  );
}

export default App;
