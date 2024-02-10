import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";

import Router from './src/navigation/router';
import { store } from './src/store/store';
import { Provider } from 'react-redux';



const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})