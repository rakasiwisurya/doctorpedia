import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';

export default function Button({variant, children, onPress, iconOnly, icon}) {
  if (iconOnly) {
    return <IconOnly icon={icon} onPress={onPress} />;
  }

  return (
    <TouchableOpacity style={styles.container(variant)} onPress={onPress}>
      <Text style={styles.text(variant)}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: variant => ({
    backgroundColor:
      (variant === 'primary' && colors.button.primary.background) ||
      (variant === 'secondary' && colors.button.secondary.background),
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: variant => ({
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color:
      (variant === 'primary' && colors.button.primary.text) ||
      (variant === 'secondary' && colors.button.secondary.text),
  }),
});

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.string,
  onPress: PropTypes.func,
  iconOnly: PropTypes.bool,
  icon: PropTypes.string,
};
