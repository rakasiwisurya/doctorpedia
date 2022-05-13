import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {firebaseApp} from '../../config';

export default function Splash({navigation}) {
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // user is logged in
        navigation.replace('MainApp');
      } else {
        // session is expired, user have to login again
        navigation.replace('GetStarted');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ILLogo />
      <Text style={styles.title}>Doctorpedia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});

Splash.propTypes = {
  navigation: PropTypes.object,
};
