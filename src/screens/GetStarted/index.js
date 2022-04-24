import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {ILGetStarted, ILLogo} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../utils';

export default function GetStarted({navigation}) {
  return (
    <ImageBackground source={ILGetStarted} style={styles.screen}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>
      <View>
        <Button
          variant="primary"
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Get Started
        </Button>
        <Gap height={16} />
        <Button
          variant="secondary"
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Sign In
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    width: 240,
    fontSize: 28,
    color: colors.white,
    marginTop: 91,
    fontFamily: fonts.primary[600],
  },
});

GetStarted.propTypes = {
  navigation: PropTypes.object,
};
