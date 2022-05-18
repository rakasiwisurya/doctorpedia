import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from 'react-native-select-dropdown';
import {colors, fonts} from '../../../utils';

export default function Select({label, data, onSelect, defaultButtonText}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        buttonTextAfterSelection={selectedItem => selectedItem}
        rowTextForSelection={item => item}
        defaultButtonText={defaultButtonText}
        buttonStyle={styles.buttonSelect}
        buttonTextStyle={styles.buttonSelectText}
        rowTextStyle={styles.rowText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
  buttonSelect: {
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
  },
  buttonSelectText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
  },
  rowText: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
  },
});

Select.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  defaultButtonText: PropTypes.string,
};
