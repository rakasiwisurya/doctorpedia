import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getAuth, signOut} from 'firebase/auth';
import {Gap, Header, List, Profile} from '../../components';
import {colors, getData, showError} from '../../utils';
import {firebaseApp} from '../../config';

export default function UserProfile({navigation}) {
  const [profile, setProfile] = useState({
    photo: null,
    fullname: null,
    profession: null,
  });

  useEffect(() => {
    getData('user').then(user => {
      const data = {
        ...user,
        photo: user.photo ? {uri: user.photo} : null,
      };

      setProfile(data);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        navigation.reset({
          routes: [
            {
              name: 'GetStarted',
            },
          ],
        });
      })
      .catch(error => {
        console.error(error);
        showError(error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <Header title="Profile" onPress={() => navigation.replace('MainApp')} />
      <Gap height={10} />
      <Profile
        photo={profile.photo}
        name={profile.fullname}
        profession={profile.profession}
      />
      <Gap height={14} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <List
          icon="help"
          name="Help Center"
          desc="Read our guidelines"
          isNext
        />

        <List
          icon="logout"
          name="Logout"
          desc="Clear user session"
          isNext
          onPress={handleLogout}
        />
      </ScrollView>
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
