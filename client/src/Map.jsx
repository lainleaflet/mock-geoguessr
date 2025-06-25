import { useState, useEffect } from 'react'
import axios from "axios"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import MapClickHandler from './MapClickHandler';

function Map ({location}) {
    const [guess, setGuess] = useState(null)

    return (
    <div>
      {location && (
        <MapContainer
          center = {[20, 0]}
          zoom={5}
          style={{ height: "250px", width: "400px" }}
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

export default Map