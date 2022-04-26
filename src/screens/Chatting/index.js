import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

export default function Chatting({navigation}) {
  return (
    <View style={styles.screen}>
      <Header
        title="Nairobi Putri Hayza"
        category="Dokter Anak"
        onPress={() => navigation.goBack()}
        isDarkProfile
      />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Senin, 21 Maret 2020</Text>
        <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe />
      </View>
      <InputChat />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});

Chatting.propTypes = {
  navigation: PropTypes.object,
};
