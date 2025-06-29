import { LoadScript, GoogleMap, StreetViewPanorama} from "@react-google-maps/api"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "100vh"
}

function StreetView ({location}) {
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={12}
        >
            <StreetViewPanorama
                position={location}
                visible={true}
                options={{
                    disableDefaultUI: true,
                    showRoadLabels: false
                }}
            />
        </GoogleMap>
    )
}

export default StreetView;