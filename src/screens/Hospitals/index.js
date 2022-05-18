import {StyleSheet, Text, View, ImageBackground, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ILHospitalsBG} from '../../assets';
import {colors, fonts, showError} from '../../utils';
import {ListHospital} from '../../components';
import {getDatabase, onValue, ref} from 'firebase/database';
import {firebaseApp} from '../../config';

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = () => {
    const db = getDatabase(firebaseApp);
    onValue(
      ref(db, 'hospitals/'),
      snapshots => {
        if (snapshots.val()) {
          const data = snapshots.val().map(snapshot => ({
            ...snapshot,
            image: {uri: snapshot.image},
          }));
          setHospitals(data);
        }
      },
      error => {
        console.error(error);
        showError(error.message);
      },
      {onlyOnce: true},
    );
  };

  const renderListHospital = ({item}) => (
    <ListHospital
      picture={item.image}
      type={item.type}
      name={item.name}
      address={item.address}
    />
  );

  return (
    <View style={styles.screen}>
      <ImageBackground source={ILHospitalsBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <FlatList
          keyExtractor={item => item.id}
          data={hospitals}
          renderItem={renderListHospital}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
