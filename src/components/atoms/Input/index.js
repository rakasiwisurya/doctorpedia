import {StyleSheet, TextInput, Text, View} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';

export default function Input(props) {
  const {
    label,
    value,
    onChangeText,
    isSecureTextEntry,
    isDisabled,
    keyboardType,
    isMultiline,
    autoCapitalize,
  } = props;

  const [border, setBorder] = useState(colors.border);

  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };

  const onBlurForm = () => {
    setBorder(colors.border);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border, isDisabled)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecureTextEntry}
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize={autoCapitalize && autoCapitalize}
        multiline={isMultiline}
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
  input: (border, isDisabled) => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
    color: colors.text.secondary,
    backgroundColor: isDisabled && colors.border,
  }),
});

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  isSecureTextEntry: PropTypes.bool,
  isDisabled: PropTypes.bool,
  keyboardType: PropTypes.string,
  isMultiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};
