import { useState, useEffect } from 'react'
import Map from './Map';
import StreetView from './StreetView';
import './App.css'


const BOUNDING_BOXES = [
  {minLat: 34.0, maxLat: 42.5, minLng: -98.0, maxLng: -73.0}, // USA
  {minLat: 41.303, maxLat: 51.124, minLng: -5.142, maxLng: 9.561}, // France
  {minLat: 36.0, maxLat: 43.8, minLng: -9.5, maxLng: 3.3}, // Spain and Portugal
  {minLat: 49.9, maxLat: 59.5, minLng: -10.5, maxLng: 1.8}, // UK and Ireland
  {minLat: 45.7, maxLat: 55.0, minLng: 13.8, maxLng: 24.2 }, // Poland to Hungary
  {minLat: -52.0, maxLat: -17.5, minLng: -74.0, maxLng: -56.5}, // Chile and Argentina
  {minLat: -22.0, maxLat: -6, minLng: -57, maxLng: -40}, // Brazil
  {minLat: -34, maxLat: -21.2, minLng: 115.4, maxLng: 149}, // Australia
  {minLat: 12, maxLat: 21, minLng: 99, maxLng: 105} // parts of Thailand, Laos, Cambodia and Vietnam
]



function App() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  function getRandomCoordinates(minLat, maxLat, minLng, maxLng){
    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;
    return { lat, lng };
  }

  const fetchLocation = () => {
    if (!window.google || !window.google.maps) {
      setError("Google Maps JS API not loaded");
      return;
    }

    const service = new window.google.maps.StreetViewService();
    const MAX_ATTEMPTS = 20;
    let attempts = 0;
    
    const tryLocation = () => {
      let i = Math.floor(Math.random() * (BOUNDING_BOXES.length))

      const { lat, lng } = getRandomCoordinates(
        BOUNDING_BOXES[i].minLat,
        BOUNDING_BOXES[i].maxLat,
        BOUNDING_BOXES[i].minLng,
        BOUNDING_BOXES[i].maxLng
      );
      console.log(`Trying location: ${lat}, ${lng}`);

      service.getPanorama({location: {lat, lng}, radius: 3000}, (data, status) => {
        if (status === window.google.maps.StreetViewStatus.OK ) {
          const panoramaLatLng = data.location.latLng.toJSON()
          setLocation(panoramaLatLng)
        } else {
          attempts++
          if (attempts < MAX_ATTEMPTS){
            tryLocation();
          } else {
            setError("Failed to find a valid Street View location.");
          }
        }
      })
  
    }
  tryLocation()
}

  useEffect(() => {
    fetchLocation()
  }, [])

  if (error) return <div>{error}</div>
  if (!location) return <div>Loading...</div>


  return (
    <div>
      {location && (
          <StreetView location={location} />
      )}
      <div className = "map">
        <Map location = {location}/>
      </div>
    </div>
  )
}

export default App
