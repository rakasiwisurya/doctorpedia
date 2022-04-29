import {StyleSheet, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Header, List} from '../../components';
import {DummyDoctor1} from '../../assets';
import {colors} from '../../utils';

export default function ChooseDoctor({navigation}) {
  return (
    <View style={styles.screen}>
      <Header
        title="Pilih Dokter Anak"
        onPress={() => navigation.goBack()}
        isDark
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
        isNext
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
        isNext
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
        isNext
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
        isNext
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
        isNext
        onPress={() => navigation.navigate('Chatting')}
      />
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
};
