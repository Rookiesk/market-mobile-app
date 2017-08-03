import {
  AppRegistry,
  StyleSheet,
  Image,
  View
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import store from 'react-native-simple-store'
import Login from './src/Components/Login'
import Splash from './src/Components/Splash'
import Home from './src/Components/Home'
import Drawer from './src/Drawer'
import Dev from './src/Components/Dev'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 403) {
        console.log('permission denied')
    }
    return Promise.reject(error);
  });


const SimpleApp = StackNavigator({
    Drawer: { screen: Drawer },
    Dev: { screen: Dev },
    Splash: { screen: Splash },
    Login: { screen: Login },
    Home: { screen: Home },
},
{
    initialRouteName: "Drawer",
    headerMode: "none",
})

AppRegistry.registerComponent('reactTutorialApp', () => SimpleApp)
