import {StyleSheet, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Gap, Header, List, Profile} from '../../components';
import {colors} from '../../utils';

export default function UserProfile({navigation}) {
  return (
    <View style={styles.screen}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Shayna Melinda" profession="Product Designer" />
      <Gap height={14} />
      <List
        icon="edit-profile"
        name="Edit Profile"
        desc="Last update yesterday"
        onPress={() => navigation.navigate('UpdateProfile')}
        isNext
      />
      <List
        icon="language"
        name="Language"
        desc="Available 12 languages"
        isNext
      />
      <List
        icon="rate"
        name="Give Us Rate"
        desc="On Google Play Store"
        isNext
      />
      <List icon="help" name="Help Center" desc="Read our guidelines" isNext />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

UserProfile.propTypes = {
  navigation: PropTypes.object,
};
