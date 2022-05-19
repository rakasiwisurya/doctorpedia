import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ILNullPhoto} from '../../../assets';
import {colors, fonts, getData} from '../../../utils';

export default function HomeProfile({onPress}) {
  const [profile, setProfile] = useState({
    photo: null,
    fullname: null,
    profession: null,
  });

  useEffect(() => {
    getData('user').then(user => {
      const data = user;
      if (user.photo) {
        data.photo = {uri: user.photo};
      }

      setProfile(data);
    });
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={profile.photo ? profile.photo : ILNullPhoto}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});

HomeProfile.propTypes = {
  onPress: PropTypes.func,
};
