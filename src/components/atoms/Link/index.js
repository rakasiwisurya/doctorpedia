import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';

export default function Link({children, size, align}) {
  return (
    <View>
      <Text style={styles.text(size, align)}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: (size, align) => ({
    fontSize: size,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});

Link.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.number,
  align: PropTypes.string,
};
