import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {List} from '../../components';
import {colors, fonts} from '../../utils';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';

export default function Messages({navigation}) {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile: DummyDoctor1,
      name: 'Alexander Jannie',
      desc: 'Baik bu, terima kasih atas wakt...',
    },
    {
      id: 2,
      profile: DummyDoctor2,
      name: 'John McParker Steve',
      desc: 'Baik bu, terima kasih atas wakt...',
    },
    {
      id: 3,
      profile: DummyDoctor3,
      name: 'Nairobi Putri Hayza',
      desc: 'Baik bu, terima kasih atas wakt...',
    },
  ]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => (
          <List
            key={doctor.id}
            profile={doctor.profile}
            name={doctor.name}
            desc={doctor.desc}
            onPress={() => navigation.navigate('Chatting')}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});

Messages.propTypes = {
  navigation: PropTypes.object,
};
