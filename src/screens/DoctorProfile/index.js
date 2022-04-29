import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function DoctorProfile({navigation}) {
  return (
    <View style={styles.screen}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name="Nairobi Putri Hayza" profession="Dokter Anak" />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value="Universitas Indonesia, 2020" />
      <ProfileItem label="Tempat Praktik" value="Rumah Sakit Umum, Bandung" />
      <ProfileItem label="No. STR" value="0000116622081996" />
      <View style={styles.action}>
        <Button
          variant="primary"
          onPress={() => navigation.navigate('Chatting')}>
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
};
