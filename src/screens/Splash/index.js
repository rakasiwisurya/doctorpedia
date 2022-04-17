import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';

export default function Splash({navigation}) {
  useEffect(() => {
    const countdown = setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);

    return () => {
      clearTimeout(countdown);
    };
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
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#112340',
    marginTop: 20,
  },
});
