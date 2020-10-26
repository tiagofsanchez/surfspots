import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "react-query";
import axios from "axios";

const url =
  "https://spreadsheets.google.com/feeds/list/1Dk1KD6ldix8ZEMJNa4evmrl2MJeFM5g6g9Cxis-oPjc/1/public/full?alt=json";
const fetcher = () => axios.get(url).then((res) => res.data);

const useSpots = () => {
  return useQuery("spots", () => fetcher());
};

const SurfSpotMaps = () => {
  const surfSpots = useSpots();
  const [activeSpot, setActiveSpot] = React.useState(null);

  console.log(surfSpots);
  return (
    <div>
      {surfSpots.isLoading ? (
        <span>Loading...</span>
      ) : (
        <Map center={[39.3558, -9.345]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {surfSpots.data.feed.entry.map((spot) => {
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
      )}
    </div>
  );
};

export default SurfSpotMaps;
