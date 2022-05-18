import {StyleSheet, ScrollView, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {launchImageLibrary} from 'react-native-image-picker';
import {getDatabase, onValue, ref, update} from 'firebase/database';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, showError, storeData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {firebaseApp} from '../../config';
import {getAuth, updatePassword} from 'firebase/auth';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    photo: null,
    fullname: '',
    profession: '',
    email: '',
  });
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData('user').then(user => {
      const data = {
        ...user,
        photo: user.photo ? {uri: user.photo} : null,
      };

      setProfile(data);
    });
  }, []);

  const handleImage = async () => {
    if (profile.photo) {
      setPhoto(ILNullPhoto);
      setProfile({...profile, photo: null});
    } else {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        includeBase64: true,
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      });

      // if user cancel to upload
      if (result.didCancel) return;

      // if any error to upload file
      if (result.errorMessage) {
        return showError(errorMessage);
      }

      // if the file is too large (more than 2MB)
      if (result.assets[0].fileSize > 2097152) {
        return showError('This file is too large, max file is 2MB');
      }

      const source = {uri: result.assets[0].uri};
      setProfile({
        ...profile,
        photo: {
          uri: `data:${result.assets[0].type};base64, ${result.assets[0].base64}`,
        },
      });
      setPhoto(source);
    }
  };

  const handleTextChange = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    dispatch({type: 'SET_LOADING', payload: true});

    // if user update password
    if (password.length > 0) {
      if (password.length < 6) {
        dispatch({type: 'SET_LOADING', payload: false});
        return showError('Password must be more than 6 characters');
      }

      const auth = getAuth(firebaseApp);
      updatePassword(auth.currentUser, password).catch(error => {
        dispatch({type: 'SET_LOADING', payload: false});
        console.error(error);
        showError(error.message);
      });
    }

    // update user profile
    const data = profile;
    if (profile.photo) {
      data.photo = profile.photo.uri;
    }

    const db = getDatabase(firebaseApp);
    const dbRef = ref(db, `user/${profile.uid}`);
    update(dbRef, data)
      .then(() => {
        dispatch({type: 'SET_LOADING', payload: false});
        onValue(
          dbRef,
          snapshot => {
            if (snapshot.val()) {
              storeData('user', snapshot.val());
              navigation.replace('UserProfile');
            }
          },
          error => {
            console.error(error);
            showError(error.message);
          },
          {onlyOnce: true},
        );
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', payload: false});
        console.error(error);
        showError(error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Edit Profile"
        onPress={() => navigation.replace('UserProfile')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile
            photo={photo === ILNullPhoto ? profile.photo : photo}
            name={profile.fullname}
            profession={profile.profession}
            onPress={handleImage}
            icon={profile.photo ? 'remove' : 'add'}
          />
          <Gap height={26} />
          <Input label="Email Address" value={profile.email} isDisabled />
          <Gap height={24} />
          <Input
            label="Full Name"
            value={profile.fullname}
            onChangeText={value => handleTextChange('fullname', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => handleTextChange('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            isSecureTextEntry
          />
          <Gap height={40} />
          <Button variant="primary" onPress={handleUpdate}>
            Save Profile
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});

UpdateProfile.propTypes = {
  navigation: PropTypes.object,
};
