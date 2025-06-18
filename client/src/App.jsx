import { useState, useEffect } from 'react'
import axios from "axios"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import MapClickHandler from './MapClickHandler';
import L from "leaflet";

function App() {
  const [location, setLocation] = useState(null)
  const [guess, setGuess] = useState(null)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/random-location")
    .then(res => setLocation(res.data))
    .catch(err => console.error(err));
  }, [])

  return (
    <div>
      <h1>GeoGuessr Clone</h1>
      {location && (
        <MapContainer
          center = {[20, 0]}
          zoom={5}
          style={{ height: "500px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler onGuess = {setGuess} />

          {guess && (
            <Marker position={guess}>
              <Popup>Your guess</Popup>
            </Marker>
          )}

          {location && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>Actual Location</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  )
}

export default App
