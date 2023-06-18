import { useEffect } from 'react';


export const WeatherData = ({zipCode, weatherData, noData,refresh,
                              setWeatherData, setIsLoading, setNoData, setRefresh }) => {

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  useEffect(() => {
    setRefresh(false)
    let coordinates = { lat: '', lon: '' };

    fetch(`https://api.zippopotam.us/IT/${zipCode}`)
    .then((res) => res.json())
    .then((data) => { coordinates.lat = data.places[0].latitude; coordinates.lon = data.places[0].longitude;
                      setIsLoading(true);  console.log(coordinates);})


    .then(() => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${API_KEY}&units=metric`;
      return fetch(weatherUrl);
    })
    .then((res) => res.json())
    .then((data) => {
      setWeatherData(data);
      setIsLoading(false);
      setNoData(false);
    })


    .catch((err) => {console.log({'ziperror': err});
      if (err && zipCode?.length >= 5) {
                        setNoData(true)
                        setIsLoading(false)
                        console.log({'Zip code not found': err});
                      }

      else if (err && !zipCode?.length === 0 && !zipCode) {
          console.log({'Nothing written': err});}

        else {console.log({'Sufficient digits': err});}

      });

    console.log(weatherData);

}, [zipCode, refresh]);

return (zipCode, weatherData, noData, refresh, setWeatherData, setIsLoading,setNoData, setRefresh );
  }
