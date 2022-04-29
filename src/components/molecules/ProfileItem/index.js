import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';

export default function ProfileItem({label, value}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
});

ProfileItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
