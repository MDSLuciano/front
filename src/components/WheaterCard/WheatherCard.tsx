import { format } from "date-fns";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./WheatherCard.css";
import type { Weather } from "../../models/WeatherModel";
import { api } from "../../lib/axios";

interface WeatherCardProps {
    weather: Weather;
    refreshCard: (cityName: string) => void;
}

export default function WeatherCard({weather, refreshCard}: WeatherCardProps){
    const [isFavorited, setIsFavorited] = useState(weather.isFavorite);

    async function toggleFavorite() {
        // TODO: VERIFICAR SE A CIDADE É FAVORITA, SE FOR,
        // CHAMAR A API PARA REMOVER CIDADE DOS FAVORITOS
        // SENÃO, ADICIONAR CIDADE AOS FAVORITOS
        const response = await api.get("/favoritecity")
        console.log(response.data)

        // TODO: TROCAR O VALOR DE ISFAVORITED
        // TODO: CHAMAR RESFRESHCARD COM O NOME DA CIDADE
    }

    return (
        <div className="card">
            <div className="favorite-icon" onClick={toggleFavorite}>
                {isFavorited ? <FaStar color="gold" /> : <FaRegStar />}
            </div>
            <div className="cardContent">
                <h2>Clima em {weather.location.name}</h2>
                <p>País: {weather.location.country}</p>
                <p>Temperatura: {weather.current.temp_c.toFixed(0)}°C</p>
                <p>Condição: {weather.current.condition.text}</p>
                <p>Ultima Atualização: {format(weather.current.last_updated, "dd-MM-yyyy HH:mm")} </p>
            </div>
        </div>
    )

}