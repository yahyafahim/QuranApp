import React, {Component} from 'react';
import Nav from './src';
import {
  View,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Platform,
  I18nManager,
} from 'react-native';

import {store} from './src/redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {Loader} from './src/config';
import Toast from 'react-native-toast-message';
import Orientation from 'react-native-orientation-locker';

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Remote debugger']);

class App extends Component {
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <Wrapper>
        <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Provider store={store}>
            <Loader />
            <Nav />
            <Toast />
          </Provider>
        </GestureHandlerRootView>
      </Wrapper>
    );
  }
}

export default App;

function Wrapper({children}) {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{flex: 1}}>{children}</View>;
}
