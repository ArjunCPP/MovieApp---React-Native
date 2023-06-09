import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React,{useEffect} from "react";


const Stack = createStackNavigator()


export default function App() {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{headerShown:false}}/>
        <Stack.Screen
        name='movie'
        component={MovieScreen}
        options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )

//   useEffect(() => {
//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }
//     prepare(); 
//   },[]);

//   if(!fontLoaded){
//     return undefined;
    
//   }else{
//     SplashScreen.hideAsync();
//   }
}