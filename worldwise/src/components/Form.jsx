// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import {useEffect, useState} from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import {useURLPosition} from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../contexts/CitiesContext";
import {useNavigate} from "react-router-dom";
export function convertToEmoji(countryCode) {
    const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
    const navigate = useNavigate();
    const {createCity, isLoading} = useCities();
    const {lat: maplat, lng: maplng} = useURLPosition();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");
    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError("");
                const response = await fetch(`${BASE_URL}?latitude=${maplat}&longitude=${maplng}`);
                const data = await response.json();
                if (!data.countryCode) throw new Error("That doesn't seem to be a city");
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                setEmoji(convertToEmoji(data.countryCode));
            } catch (error) {
                setGeocodingError(error.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [maplat, maplng]);

    if (geocodingError) {
        return <Message message={geocodingError} />;
    }
    if (isLoadingGeocoding) {
        return <Spinner />;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat: maplat, lng: maplng},
        };
        await createCity(newCity);
        navigate("/app/cities");
    }

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
                {/* //selected same as value */}
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}
export default Form;
