import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {ref, onValue, getDatabase} from 'firebase/database';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts, showError, storeData} from '../../utils';
import {useForm} from '../../hooks';
import {firebaseApp} from '../../config';

export default function Login({navigation}) {
  let cleanup = false;

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      cleanup = true;
    };
  }, []);

  const handleLogin = () => {
    dispatch({type: 'SET_LOADING', payload: true});

    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(response => {
        if (cleanup) return;
        dispatch({type: 'SET_LOADING', payload: false});
        setForm('reset');

        const db = getDatabase(firebaseApp);
        const dbRef = ref(db, `users/${response.user.uid}`);
        onValue(
          dbRef,
          snapshot => {
            if (snapshot.val()) {
              storeData('user', snapshot.val());
              navigation.reset({
                routes: [
                  {
                    name: 'MainApp',
                  },
                ],
              });
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Address"
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
        <Gap height={10} />
        <Link size={12}>Forgot My Password</Link>
        <Gap height={40} />
        <Button variant="primary" onPress={handleLogin}>
          Sign In
        </Button>
        <Gap height={30} />
        <Link
          size={16}
          align="center"
          onPress={() => navigation.replace('Register')}>
          Create New Account
        </Link>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};
