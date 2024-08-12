import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styles';
import { WeathersDef } from './types/weathers';

const API_KEY = '3750fe93626024061afddd29fd1af246';

export default function App() {
  const [location, setLocation] = useState<null | Location.LocationGeocodedAddress>(null);
  const [weathers, setWeathers] = useState<WeathersDef[]>([]);

  useEffect(() => {
    getLocAndWeather();
  }, []);

  const getLocAndWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      console.log('false!');
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 6 });
    const here = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setLocation(here[0]);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const { weather } = await response.json();
    setWeathers(weather);
  };

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{`${location?.city}/${location?.district}`}</Text>
      </View>
      <View style={styles.weather}>
        <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
          {weathers.map((weather) => (
            <View key={weather.id} style={styles.day}>
              <Text style={styles.date}>{new Date().getDate()}</Text>
              <Text style={styles.main}>{weather.main}</Text>
              <Text style={styles.desc}>{weather.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
