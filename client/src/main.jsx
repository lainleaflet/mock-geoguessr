import "leaflet/dist/leaflet.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadScript } from "@react-google-maps/api";
import './index.css'
import App from './App.jsx'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

createRoot(document.getElementById('root')).render(
  // <StrictMode> cancelled just so api calls are not loaded twice
  <LoadScript googleMapsApiKey={API_KEY}>
    <App />
  </LoadScript>
  // {/* </StrictMode>, */}
)
