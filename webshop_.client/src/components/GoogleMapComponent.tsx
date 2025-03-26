import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
};

const defaultPosition = { lat: 47.4979, lng: 19.0402 };

const GoogleMapComponent: React.FC = () => {
    const [position, setPosition] = React.useState<{ lat: number; lng: number } | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => setPosition(defaultPosition)
        );
    }, []);

    if (!isLoaded) {
        return <p>Térkép betöltése...</p>;
    }

    return (
        <div className="map-container">
            <GoogleMap mapContainerStyle={containerStyle} center={position || defaultPosition} zoom={15}>
                <Marker position={position || defaultPosition} />
            </GoogleMap>
        </div>
    );
};

export default GoogleMapComponent;
