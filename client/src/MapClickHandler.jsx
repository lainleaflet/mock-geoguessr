import { useMapEvents } from "react-leaflet";

function MapClickHandler({onGuess}){
    useMapEvents({
        click(e){
            onGuess([e.latlng.lat, e.latlng.lng])
        }
    })

    return null;
}

export default MapClickHandler