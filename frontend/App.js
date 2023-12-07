//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import HomeScreen from './screens/HomeScreen';
import StackNavigator from './navigation/StackNavigator';
//import Cart from './screens/Cart/Cart';
import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
//import { ToastProvider } from 'react-native-toast-message';
export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, [])


  return (
    <Provider store={store}>

      <StackNavigator />

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
