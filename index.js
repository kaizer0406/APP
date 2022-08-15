/**
 * @format
 */
 import React from 'react';
 import { AppRegistry, StatusBar } from 'react-native';
 import App from './App';
 import { Provider } from 'react-redux';
 import { NavigationContainer } from '@react-navigation/native';
 import { name as appName } from './app.json';
 import configureStore from './store';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 
 const store = configureStore();

export default function Main() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                <StatusBar backgroundColor="#FFFFFF" barStyle='dark-content' />
                <App />
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    );
  }
  

AppRegistry.registerComponent(appName, () => Main);