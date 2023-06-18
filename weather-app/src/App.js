import React, { useState, useEffect } from 'react';

import { TextField, Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customTheme } from './components/customThemeSelect';


import SearchIcon from '@mui/icons-material/Search';

import { WiStrongWind, WiHumidity, WiRefresh } from "react-icons/wi"

import dayBackground from './img/backgrounds/dayBackground.jpg';
import nightBackground from './img/backgrounds/nightBackground.jpg';


import starry from './img/weatherIcons/starry.png';
import sunny from './img/weatherIcons/sunny.png';
import thunderstorm from './img/weatherIcons/thunderstorm.png';
import cloudyDay from './img/weatherIcons/cloudyDay.png';
import cloudyNight from './img/weatherIcons/cloudyNight.png';
import rainy from './img/weatherIcons/rainy.png';
import misty from './img/weatherIcons/misty.png';
import tornado from './img/weatherIcons/tornado.png';
import foggy from './img/weatherIcons/foggy.png';
import snowflake from './img/weatherIcons/snowflake.png';
import drizzle from './img/weatherIcons/drizzle.png';



import { WeatherData } from './components/weatherData.js';


const WeatherApp = () => {

  const outerTheme = useTheme();
  const [zipCode, setZipCode] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const [weatherInfo, setWeatherInfo] = useState({
    weather: null, temp: null, minTemp: null, maxTemp: null, feels_like: null,
    humidity: null, wind: null,
    city: null, backgroundImage: null
  });
  const [suggestion, setSuggestion] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);


  const [weatherBackgroundImage, setWeatherBackgroundImage] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [textSecondaryColor, setTextSecondaryColor] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(null);

  // if icon has n in the name, it's night time (ex. 01n = clear night)
  // if icon has d in the name, it's day time (ex. 01d = clear day)

  useEffect(() => {

    setRefresh(false);

    if (weatherData?.weather[0].icon.includes('n')) {
      setWeatherBackgroundImage(nightBackground);
      setTextColor('#cfd8dc');
      setTextSecondaryColor('#b0bec5')
      setBackgroundColor('#061217ab');
    } else {
      setWeatherBackgroundImage(dayBackground);
      setTextColor('#455a64');
      setTextSecondaryColor('#455a64')
      setBackgroundColor('#bcdae238');
    }


    setWeatherInfo({
      weather: weatherData?.weather[0].main, temp: Math.round(weatherData?.main.temp), minTemp: Math.floor(weatherData?.main.temp_min), maxTemp: Math.ceil(weatherData?.main.temp_max),
      feels_like: Math.round(weatherData?.main.feels_like), humidity: weatherData?.main.humidity, wind: weatherData?.wind.speed,
      city: weatherData?.name
    });


    if (weatherData?.weather[0].main === 'Clear' && weatherData?.weather[0].icon.includes('d')) {
      setSuggestion('Goditi il sole!'); setWeatherIcon(sunny);
    }

    else if (weatherData?.weather[0].main === 'Clear' && weatherData?.weather[0].icon.includes('n')) {
      setSuggestion('Goditi la notte'); setWeatherIcon(starry);
    }

    else if (weatherData?.weather[0].main === 'Clouds' && weatherData?.weather[0].icon.includes('d')) {
      setSuggestion('Non dimenticare la giacca'); setWeatherIcon(cloudyDay);
    }
    else if (weatherData?.weather[0].main === 'Clouds' && weatherData?.weather[0].icon.includes('n')) {
      setSuggestion('Non dimenticare la giacca'); setWeatherIcon(cloudyNight);
    }
    else if (weatherData?.weather[0].main === 'Rain') {
      setSuggestion('Non dimenticare l\'ombrello! e la giacca'); setWeatherIcon(rainy);
    }
    else if (weatherData?.weather[0].main === 'Snow') {
      setSuggestion('Non dimenticare i guanti e la giacca'); setWeatherIcon(snowflake);
    }
    else if (weatherData?.weather[0].main === 'Thunderstorm') {
      setSuggestion('Non dimenticare l\'ombrello!'); setWeatherIcon(thunderstorm);
    }
    else if (weatherData?.weather[0].main === 'Drizzle') {
      setSuggestion('Non dimenticare l\'ombrello!'); setWeatherIcon(drizzle);
    }
    else if (weatherData?.weather[0].main === 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Sand' || 'Ash' || 'Squall') {
      setSuggestion('Ochio'); setWeatherIcon(misty);
    }
    else if (weatherData?.weather[0].main === 'Fog') {
      setSuggestion('Ochio'); setWeatherIcon(foggy);
    }
    else if (weatherData?.weather[0].main === 'Tornado') {
      setSuggestion('No'); setWeatherIcon(tornado);
    }
    else {
      setSuggestion('No suggestion available'); setWeatherIcon(null);
      setWeatherInfo((prevWeatherInfo) => ({
        ...prevWeatherInfo
      }));
    }


  }, [weatherData]);


  const refreshWeather = () => {
    setRefresh(true);
    setWeatherData(weatherData);
    setZipCode(zipCode);
  }

  return (<>
    <WeatherData zipCode={zipCode}  weatherData={weatherData} noData={noData} refresh={refresh}
      setZipCode={setZipCode} setWeatherData={setWeatherData} setIsLoading={setIsLoading} setNoData={setNoData} setRefresh={setRefresh} />

    <Box
      sx={{
        backgroundImage: `url(${weatherBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, zIndex: -1
      }}
    >
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
          maxWidth: '550px',
          minWidth: '280px',
          height: '70%',
          minHeight: '600px',
          backgroundColor: { backgroundColor },
          borderRadius: '2rem',
          boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.2)',
          flexDirection: 'column',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            flexBasis: '80%',

          }}
        ><ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              id="search"
              type="search"
              label="Search"
              value={zipCode}
              variant="standard"
              size="small"
              color='secondary'
              fullWidth
              onChange={(event) => setZipCode(event.target.value)}
              sx={{ marginBottom: '1rem', width: '70%', minWidth: '240px', input: { color: textColor } }}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    onClick={() => { weatherData ? setNoData(false) : setNoData(true) }}
                    sx={{ cursor: 'pointer', color: textSecondaryColor }}
                  />
                ),
              }}
            /></ThemeProvider>
          {isLoading && refresh && (
            <Typography variant="body2" sx={{ color: textSecondaryColor }}>
              Loading...
            </Typography>
          )}
          {noData && (
            <Typography variant="body2" sx={{ color: textColor }}>
              No data available. Please try again.
            </Typography>
          )}
          {!isLoading && !noData && weatherData && (
            <>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  width: '70%', minWidth: '260px',
                  mb: 2,
                  marginTop: '0.5rem', marginBottom: '0.5rem'
                }}
              >
                <Box sx={{
                  height: 'auto', display: 'flex',
                  flexDirection: 'column', justifyContent: 'space-between',
                  alignItems: 'flex-start', minWidth: '40px'
                }} >
                  <Typography variant="h6" color={textColor} mb={2}>
                    {weatherInfo.city}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{ width: '90%', marginTop: '0.5rem' }}
                    image={weatherIcon}
                    alt="Weather Icon"
                  />

                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column', justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }} >

                  <Typography variant="h5" color={textSecondaryColor} mb={2} >
                    {weatherInfo.temp} °C
                  </Typography>
                  <Typography variant="paragraph" color={textColor} mb={2}>
                    {weatherInfo.weather}
                  </Typography>
                  <Typography variant="body2" color={textColor} >
                    Feels Like: {weatherInfo.feels_like} °C
                  </Typography>

                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  width: '70%', minWidth: '260px',
                  mb: 2,
                  marginTop: '0.5rem', marginBottom: '0.5rem'
                }}
              >
                <Box sx={{
                  height: '100%', marginTop: '2rem', display: 'flex',
                  flexDirection: 'column', justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }} >
                  <Typography variant="body2" color={textColor}>
                    Max Temp: {weatherInfo.maxTemp} °C
                  </Typography>
                  <Typography variant="body2" color={textColor}>
                    Min Temp: {weatherInfo.minTemp} °C
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column', justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }} >
                  <Typography variant="body2" color={textColor} >
                    <WiHumidity /> {weatherInfo.humidity}%
                  </Typography>
                  <Typography variant="body2" color={textColor} >
                    <WiStrongWind /> {weatherInfo.wind} km/h
                  </Typography>
                </Box>
              </Box>

              <Typography component="div" color={textColor}>
                <Box sx={{ fontStyle: 'italic', lineHeight: 6 }}>
                  "{suggestion}"
                </Box>
              </Typography>
              <Button startIcon={<WiRefresh />} onClick={refreshWeather}>
                Refresh
              </Button>
            </>
          )}
        </CardContent>
      </Card>

    </Box>
  </>
  );
};

export default WeatherApp;
