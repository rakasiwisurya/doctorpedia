import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../../atoms';
import {DummyDoctor6} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function DarkProfile({title, category, onPress}) {
  return (
    <View style={styles.container}>
      <Button iconOnly icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Image source={DummyDoctor6} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    marginTop: 6,
    textAlign: 'center',
    color: colors.text.subTitle,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
});

DarkProfile.propTypes = {
  onPress: PropTypes.func,
};
