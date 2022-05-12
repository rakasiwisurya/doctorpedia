import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, storeData} from '../../utils';
import {useForm} from '../../hooks';
import {firebaseApp} from '../../config';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (form.password.length < 6) {
      return showMessage({
        message: 'Password must be more than 6 characters',
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white,
      });
    }

    setIsLoading(true);

    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(response => {
        setIsLoading(false);
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
        setIsLoading(false);
        console.error(error);
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  return (
    <>
      <View style={styles.screen}>
        <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullname}
              onChangeText={value => setForm('fullname', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              isSecureTextEntry
            />
            <Gap height={40} />
            <Button variant="primary" onPress={handleContinue}>
              Continue
            </Button>
          </ScrollView>
        </View>
      </View>

      {isLoading && <Loading />}
    </>
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
