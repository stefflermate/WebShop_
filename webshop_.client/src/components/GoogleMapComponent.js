import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
};
const defaultPosition = { lat: 47.4979, lng: 19.0402 };
const GoogleMapComponent = () => {
    const [position, setPosition] = React.useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });
    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }), () => setPosition(defaultPosition));
    }, []);
    if (!isLoaded) {
        return _jsx("p", { children: "T\uFFFDrk\uFFFDp bet\uFFFDlt\uFFFDse..." });
    }
    return (_jsx("div", { className: "map-container", children: _jsx(GoogleMap, { mapContainerStyle: containerStyle, center: position || defaultPosition, zoom: 15, children: _jsx(Marker, { position: position || defaultPosition }) }) }));
};
export default GoogleMapComponent;
