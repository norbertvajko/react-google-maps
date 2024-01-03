import React, { useCallback, useMemo, useRef, useState } from 'react';
import './map.css';
import { useLoadScript } from "@react-google-maps/api";
import { 
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";
import Places from '../places/Places';
import {config as configDotenv} from 'dotenv'


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {

    const [home, setHome] = useState<LatLngLiteral>();
    const mapRef = useRef<GoogleMap>();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ["places"]
      })
    const center = useMemo( () => ({ lat: 44, lng: -80}), []);
    const options = useMemo( () =>  ({
        mapId: "ID9fc8cd2c900faee2 ",
        mapTypeId: 'satellite',
        disableDefaultUI: true, //
        // clickableIcons: false // 
    }), []);
    const onLoad = useCallback((map: any) => (mapRef.current = map), []);
    return(
        <div className="container">
            <div className="controls">
                <h1>Map Controls</h1>
                <Places 
                    setHome={(position) => {
                        setHome(position);
                        mapRef.current?.panTo(position);
                    }}
                />
            </div>
            <div className="map">
                <GoogleMap
                    zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    {home && (
                        <>
                     <Marker 
                        position={home}
                        
                        // icon="https://img.icons8.com/color/48/000000/location-off.png"
                     />
                     <Circle 
                        center={home}
                        radius={100}
                        options={closeOptions}
                    />
                     <Circle 
                        center={home}
                        radius={250}
                        options={middleOptions}
                    />
                     <Circle 
                        center={home}
                        radius={400}
                        options={farOptions}
                    />
                       
                    </>
                    )}
                </GoogleMap>
            </div>
        </div>
    )
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#87CEEB",
    fillColor: "#87CEEB",
  };
  const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.09,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };