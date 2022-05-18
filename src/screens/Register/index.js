import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {Button, Gap, Header, Input} from '../../components';
import {colors, showError, storeData} from '../../utils';
import {useForm} from '../../hooks';
import {firebaseApp} from '../../config';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleContinue = async () => {
    if (form.password.length < 6) {
      return showError('Password must be more than 6 characters');
    }

    dispatch({type: 'SET_LOADING', payload: true});

    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(response => {
        dispatch({type: 'SET_LOADING', payload: false});
        setForm('reset');

        const data = {
          uid: response.user.uid,
          photo: null,
          fullname: form.fullname,
          profession: form.profession,
          email: form.email,
        };

        const db = getDatabase(firebaseApp);
        const dbRef = ref(db, `users/${response.user.uid}/`);
        set(dbRef, data);

        storeData('user', data);

        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', payload: false});
        console.error(error);
        showError(error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label="Full Name"
            value={form.fullname}
            onChangeText={value => setForm('fullname', value)}
          />
          <Gap height={24} />
          <Input
            label="Job / Profession"
            value={form.profession}
            onChangeText={value => setForm('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            autoCapitalize="none"
            isSecureTextEntry
          />
          <Gap height={40} />
          <Button variant="primary" onPress={handleContinue}>
            Continue
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

Register.propTypes = {
  navigation: PropTypes.object,
};
