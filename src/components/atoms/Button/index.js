import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default function Button({variant, children}) {
  return (
    <View style={styles.container(variant)}>
      <Text style={styles.text(variant)}>{children}</Text>
    </View>
  );
}

const colors = {
  primary: {
    bg: '#0BCAD4',
    text: 'white',
  },
  secondary: {
    bg: 'white',
    text: '#112340',
  },
};

const styles = StyleSheet.create({
  container: variant => ({
    backgroundColor:
      (variant === 'primary' && colors.primary.bg) ||
      (variant === 'secondary' && colors.secondary.bg),
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: variant => ({
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'center',
    color:
      (variant === 'primary' && colors.primary.text) ||
      (variant === 'secondary' && colors.secondary.text),
  }),
});

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  children: PropTypes.string.isRequired,
};
