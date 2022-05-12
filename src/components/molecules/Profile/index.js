import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function Profile({photo, name, profession, onPress, icon}) {
  return (
    <View style={styles.container}>
      {icon ? (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo ? photo : ILNullPhoto} style={styles.avatar} />
          {icon === 'remove' && <IconRemovePhoto style={styles.removePhoto} />}
          {icon === 'add' && <IconAddPhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      ) : (
        <View style={styles.borderProfile} onPress={onPress}>
          <Image source={photo ? photo : ILNullPhoto} style={styles.avatar} />
        </View>
      )}

      {!!name && !!profession && (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
  },
  profession: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
});

Profile.propTypes = {
  photo: PropTypes.oneOfType([PropTypes.object, Image.propTypes.source]),
  name: PropTypes.string,
  profession: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.oneOf(['add', 'remove']),
};
