import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {ILGetStarted, ILLogo} from '../../assets';
import {Button, Gap} from '../../components';

export default function GetStarted() {
  return (
    <ImageBackground source={ILGetStarted} style={styles.screen}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>
      <View>
        <Button variant="primary">Get Started</Button>
        <Gap height={16} />
        <Button variant="secondary">Sign In</Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    width: 240,
    fontSize: 28,
    color: 'white',
    marginTop: 91,
    fontFamily: 'Nunito-SemiBold',
  },
});
