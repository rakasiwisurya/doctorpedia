import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts} from '../../utils';

export default function Login({navigation}) {
  return (
    <View style={styles.screen}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
      <Input label="Email Address" />
      <Gap height={24} />
      <Input label="Password" />
      <Gap height={10} />
      <Link size={12}>Forgot My Password</Link>
      <Gap height={40} />
      <Button variant="primary" onPress={() => navigation.replace('MainApp')}>
        Sign In
      </Button>
      <Gap height={30} />
      <Link size={16} align="center">
        Create New Account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};
