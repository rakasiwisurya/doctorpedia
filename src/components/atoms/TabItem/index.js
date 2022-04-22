import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {
  IconDoctor,
  IconDoctorActive,
  IconHospitals,
  IconHospitalsActive,
  IconMessages,
  IconMessagesActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function TabItem({title, isActive, onPress, onLongPress}) {
  const Icon = () => {
    if (title === 'Doctor') {
      return isActive ? <IconDoctorActive /> : <IconDoctor />;
    }
    if (title === 'Messages') {
      return isActive ? <IconMessagesActive /> : <IconMessages />;
    }
    if (title === 'Hospitals') {
      return isActive ? <IconHospitalsActive /> : <IconHospitals />;
    }
    return <IconDoctor />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(isActive)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: isActive => ({
    fontSize: 10,
    color: isActive ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});

TabItem.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
};
