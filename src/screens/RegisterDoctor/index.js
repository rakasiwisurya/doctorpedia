import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import {Button, Gap, Header, Input, Select} from '../../components';
import {capitalize, colors, showError, storeData, yearList} from '../../utils';
import {useForm} from '../../hooks';
import {firebaseApp} from '../../config';

const genderCategories = ['pria', 'wanita'];

export default function RegisterDoctor({navigation}) {
  const db = getDatabase(firebaseApp);

  const [profession, setProfession] = useState('');
  const [gender, setGender] = useState('');
  const [graduatedAt, setGraduatedAt] = useState('');
  const [doctorCategories, setDoctorCategories] = useState([]);
  const [form, setForm] = useForm({
    fullname: '',
    email: '',
    password: '',
    gender: '',
    university: '',
    str_number: '',
    hospital: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getDoctorCategories();
  }, []);

  const getDoctorCategories = () => {
    onValue(
      ref(db, 'doctor_categories/'),
      snapshots =>
        snapshots.val() &&
        setDoctorCategories(snapshots.val().map(snapshot => snapshot.category)),
      error => {
        console.error(error);
        showError(error.message);
      },
      {onlyOnce: true},
    );
  };

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
          fullname: capitalize(form.fullname),
          email: form.email,
          gender: form.gender,
          university: form.university,
          graduatedAt: graduatedAt,
          str_number: form.str_number,
          hospital: capitalize(form.hospital),
          profession: profession,
          gender: gender,
          photo: null,
          rate: Math.round((Math.random() * 10) / 2),
        };

        const dbRef = ref(db, `doctors/${response.user.uid}/`);
        set(dbRef, data);

        storeData('user', data);

        navigation.navigate('UploadPhotoDoctor', data);
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', payload: false});
        console.error(error);
        showError(error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <Header title="Daftar Akun Dokter" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label="Full Name"
            value={form.fullname}
            onChangeText={value => setForm('fullname', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            keyboardType="email-address"
            onChangeText={value => setForm('email', value)}
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
          <Gap height={24} />
          <Select
            label="Profession"
            data={doctorCategories}
            onSelect={selectedItem => setProfession(selectedItem)}
            defaultButtonText="-- Select Profession --"
          />
          <Gap height={24} />
          <Select
            label="Gender"
            data={genderCategories}
            onSelect={selectedItem => setGender(selectedItem)}
            defaultButtonText="-- Select Gender --"
          />
          <Gap height={24} />
          <Input
            label="University"
            value={form.university}
            onChangeText={value => setForm('university', value)}
          />
          <Gap height={24} />
          <Select
            label="Graduated At"
            data={yearList}
            onSelect={selectedItem => setGraduatedAt(selectedItem)}
            defaultButtonText="-- Select Graduated At --"
          />
          <Gap height={24} />
          <Input
            label="STR Number"
            value={form.str_number}
            keyboardType="numeric"
            onChangeText={value => setForm('str_number', value)}
          />
          <Gap height={24} />
          <Input
            label="Hospital"
            value={form.hospital}
            onChangeText={value => setForm('hospital', value)}
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

RegisterDoctor.propTypes = {
  navigation: PropTypes.object,
};
