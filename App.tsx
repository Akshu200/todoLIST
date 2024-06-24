import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigation from './src/StackNavigation'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <>
    <Provider store={store}>
      <StackNavigation />
      <Toast />
    </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})