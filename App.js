import { View, Text } from 'react-native'
import React from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import { ThemeProvider } from './src/constants/themeProvider'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </Provider>
  )
}

export default App