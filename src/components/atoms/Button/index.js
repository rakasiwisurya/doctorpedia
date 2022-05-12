import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';
import ButtonIconSend from './ButtonIconSend';

export default function Button(props) {
  const {variant, children, onPress, iconOnly, btnIconSend, icon, isDisabled} =
    props;

  if (btnIconSend) return <ButtonIconSend isDisabled={isDisabled} />;

  if (iconOnly) return <IconOnly icon={icon} onPress={onPress} />;

  if (isDisabled) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{children}</Text>
      </View>
    );
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
  disableBg: {
    backgroundColor: colors.button.disable.background,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: variant => ({
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color:
      (variant === 'primary' && colors.button.primary.text) ||
      (variant === 'secondary' && colors.button.secondary.text),
  }),
  disableText: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.button.disable.text,
  },
});

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.string,
  onPress: PropTypes.func,
  iconOnly: PropTypes.bool,
  icon: PropTypes.string,
  btnIconSend: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
