import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ListDoctor} from '../../components';
import {colors, fonts} from '../../utils';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';

export default function Messages() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile: DummyDoctor1,
      name: 'Alexander Jannie',
      desc: 'Baik bu, terima kasih atas wakt...',
    },
    {
      id: 1,
      profile: DummyDoctor2,
      name: 'Alexander Jannie',
      desc: 'Baik bu, terima kasih atas wakt...',
    },
    {
      id: 1,
      profile: DummyDoctor3,
      name: 'Alexander Jannie',
      desc: 'Baik bu, terima kasih atas wakt...',
    },
  ]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => (
          <ListDoctor
            key={doctor.id}
            profile={doctor.profile}
            name={doctor.name}
            desc={doctor.desc}
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
