import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {IconSendActive, IconSendInactive} from '../../../assets';
import {colors} from '../../../utils';

export default function ButtonIconSend({isDisabled, onPress}) {
  if (isDisabled) {
    return (
      <View style={styles.container(isDisabled)}>
        <IconSendInactive />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(isDisabled)} onPress={onPress}>
      <IconSendActive />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: isDisabled => ({
    backgroundColor: isDisabled ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
});

ButtonIconSend.propTypes = {
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};
