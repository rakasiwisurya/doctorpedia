import {StyleSheet, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function DoctorProfile({navigation, route}) {
  const {
    fullname,
    profession,
    photo,
    university,
    graduatedAt,
    hospital,
    str_number,
  } = route.params;

  return (
    <View style={styles.screen}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name={fullname} profession={profession} photo={{uri: photo}} />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value={`${university}, ${graduatedAt}`} />
      <ProfileItem label="Tempat Praktik" value={hospital} />
      <ProfileItem label="No. STR" value={str_number} />
      <View style={styles.action}>
        <Button
          variant="primary"
          onPress={() => navigation.navigate('Chatting', route.params)}>
          Start Conversation
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});

DoctorProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.shape({
    params: PropTypes.shape({
      fullname: PropTypes.string,
      profession: PropTypes.string,
      photo: PropTypes.string,
      university: PropTypes.string,
      graduatedAt: PropTypes.number,
      hospital: PropTypes.string,
      str_number: PropTypes.string,
    }),
  }),
};
