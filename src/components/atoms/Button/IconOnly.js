import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconBackDark} from '../../../assets/icon';

export default function IconOnly({onPress, icon}) {
  const Icon = () => {
    if (icon === 'dark-back') {
      return <IconBackDark />;
    }
    if (icon === 'light-back') {
      return <IconBackDark />;
    }
    return <IconBackDark />;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
}

IconOnly.propTypes = {
  onPress: PropTypes.func.isRequired,
};
