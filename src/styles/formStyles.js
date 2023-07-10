import { StyleSheet } from 'react-native'
import { Provider as DefaultTheme } from 'react-native-paper'

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16
  }
})

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: {
      fontFamily: '../../assets/fonts/RNSPhysis-Black.ttf',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: '../../assets/fonts/RNSPhysis-Medium.ttf',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: '../../assets/fonts/RNSPhysis-Light.ttf',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: '../../assets/fonts/RNSPhysis-Thin.ttf',
      fontWeight: 'normal'
    }
  }
}

export { formStyles, theme }
