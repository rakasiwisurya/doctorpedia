import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import {Header, List} from '../../components';
import {colors, parseArray, showError} from '../../utils';
import {firebaseApp} from '../../config';

export default function ChooseDoctor({navigation, route}) {
  const {category} = route.params;

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    callDoctorByCategory(category);
  }, []);

  const callDoctorByCategory = category => {
    const db = getDatabase(firebaseApp);
    onValue(
      query(ref(db, 'doctors/'), orderByChild('profession'), equalTo(category)),
      snapshots => snapshots.val() && setDoctors(parseArray(snapshots.val())),
      error => {
        console.error(error);
        showError(error.message);
      },
      {onlyOnce: true},
    );
  };

  return (
    <View style={styles.screen}>
      <Header
        title={`Pilih ${category}`}
        onPress={() => navigation.goBack()}
        isDark
      />
      {doctors.map(doctor => (
        <List
          key={doctor.uid}
          profile={{uri: doctor.photo}}
          name={doctor.fullname}
          desc={doctor.gender}
          isNext
          onPress={() => navigation.navigate('DoctorProfile', doctor)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
});

ChooseDoctor.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
    }),
  }),
};
