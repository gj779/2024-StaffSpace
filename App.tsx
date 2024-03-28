import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView, LogBox} from 'react-native';
import Navigations from './src/services/navigations';
import store from './src/redux/index';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {PushNotification} from './src/services';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaView style={{flex: 1}}>
          <PushNotification />
          <Navigations />
        </SafeAreaView>
      </MenuProvider>
    </Provider>
  );
};
export default App;
