import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {showMessage} from 'react-native-flash-message';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {ref, onValue, getDatabase} from 'firebase/database';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link, Loading} from '../../components';
import {colors, fonts, storeData} from '../../utils';
import {useForm} from '../../hooks';
import {firebaseApp} from '../../config';

export default function Login({navigation}) {
  let cleanup = false;

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      cleanup = true;
    };
  }, []);

  const handleLogin = () => {
    setIsLoading(true);

    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(response => {
        if (cleanup) return;
        setIsLoading(false);
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
          {onlyOnce: true},
        );
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
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

      {isLoading && <Loading />}
    </>
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
