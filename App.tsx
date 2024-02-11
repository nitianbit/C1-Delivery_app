import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";

import Router from './src/navigation/router';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';



const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <PaperProvider>
            <Router />
          </PaperProvider>
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})