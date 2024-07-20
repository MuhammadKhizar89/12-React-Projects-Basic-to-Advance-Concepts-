import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import styles from "./Map.module.css";
import {useState} from "react";
import {useCities} from "../contexts/CitiesContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useGeolocation} from "../hooks/useGeoLocation";
import Button from "./Button";
import {useURLPosition} from "../hooks/useURLPosition";
function Map() {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([3, 69]);
    const [searchParams] = useSearchParams();
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
    const {lat: maplat, lng: maplng} = useURLPosition();
    useEffect(() => {
        if (maplat && maplng) {
            setMapPosition([maplat, maplng]);
        }
    }, [maplat, maplng]);

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
    }, [geolocationPosition]);

    // console.log(maplat, maplng);
    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>
            <MapContainer className={styles.mapContainer} center={mapPosition} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>
                                <span>{city.emoji}</span>
                                {city.cityName}
                            </span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}
function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click(e) {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
}
export default Map;
