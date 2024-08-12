import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  city: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 38,
    fontWeight: 400,
  },
  weather: {
    backgroundColor: 'teal',
    flex: 2,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  date: {
    marginTop: 50,
    fontSize: 180,
  },
  main: {
    fontSize: 60,
  },
  desc: {
    fontSize: 30,
  },
});
