import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import Router from './router';
import store from './redux/store';
import {Loading} from './components';

function MainApp() {
  const {loading} = useSelector(state => state);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {loading && <Loading />}
      <FlashMessage position="top" />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
