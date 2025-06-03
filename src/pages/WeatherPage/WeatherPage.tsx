import { useState } from "react"
import Header from "../../components/Header/Header"
import "./WeatherPage.css"
import type { Weather } from "../../models/WeatherModel"
import { api } from "../../lib/axios"
import type { FavoriteCity } from "../../models/FavoriteCity"
import WeatherCard from "../../components/WheaterCard/WheatherCard"

export default function WeatherPage() {
    const [favoriteCitiesData, setfavoriteCitiesData] = useState<Weather[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cityToSearch, setCityToSearch] = useState<string>("");
    const [cityWeatherData, setCityWeatherData] = useState<Weather>();

    async function getFavoriteCities() {
        //TODO: LIMPAR DADOS ANTERIORES DE CIDADES FAVORITAS
        setfavoriteCitiesData([]);

        //TODO: MARCAR COMO CARREGANDO DADOS
        setIsLoading(true)

        //TODO: BUSCAR CIDADES FAVORITAS
        const response = await api.get("/favoritecity")
        //TODO: PARA CADA ITEM DO RESPONSE BUSCAR O CLIMA DA CIDADE PELO NOME
        // E ASSIM SALVAR NO ESTADO DE CIDADES FAVORITAS
        response.data.forEach(async(item: FavoriteCity) => {
            const responseWeather = await getWeatherByCity(item.name);

            if(responseWeather){
                setfavoriteCitiesData((prevState) => [...prevState, responseWeather])
            }
        })

        favoriteCitiesData.sort((a, b) => a.location.name.localeCompare(b.location.name));

        console.log(favoriteCitiesData)

        //TODO: DESMARCAR COMO CARREGANDO DADOS
        setIsLoading(false)
    }

    async function getWeatherByCity(cityName: string) {
        //TODO: FAZER A REQUISIÇÃO PARA A API BUSCANDO O CLIMA PELO
        //NOME DA CIDADE E RETORNAR O RESULTADO
        const response = await api.get<Weather>("/weather/" + cityName)

        if(response.status === 200){
            return response.data;
        }else {
            console.error("Erro ao carregar clima da cidade")
        }
    }

    async function onSubmitSearch(e: any) {
        e.preventDefault()

        const responseWeather = await getWeatherByCity(cityToSearch);

        if(responseWeather){
            setCityWeatherData(responseWeather);
        }

        setCityToSearch("");
    }

    return (
        <div className="container">
            <Header />

            <form action="#" className="formSearch" onSubmit={onSubmitSearch}>
                <input type="text" className="inputSearch" value={cityToSearch} onChange={(e =>
                    setCityToSearch(e.target.value))} placeholder="Digite o nome da cidade" />
                <button className="buttonSearch" type="submit">Buscar</button>
            </form>

            {cityWeatherData && <WeatherCard weather={cityWeatherData} refreshCard={() => {}} />}

            <h2 className="favoriteCitiesTitle">Cidades Favoritas</h2>

        </div>
    )
}