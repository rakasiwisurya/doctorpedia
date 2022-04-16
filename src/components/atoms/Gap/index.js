import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export default function Gap({height, width}) {
  return <View style={{height, width}} />;
}

Gap.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
