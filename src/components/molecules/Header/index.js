import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';
import DarkProfile from './DarkProfile';

export default function Header(props) {
  const {title, category, onPress, isDark, isDarkProfile} = props;

  if (isDarkProfile) {
    return <DarkProfile title={title} category={category} onPress={onPress} />;
  }

  return (
    <View style={styles.container(isDark)}>
      <Button
        iconOnly
        icon={isDark ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(isDark)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: isDark => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: isDark ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: isDark && 20,
    borderBottomRightRadius: isDark && 20,
  }),
  text: isDark => ({
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: isDark ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  onPress: PropTypes.func,
  isDark: PropTypes.bool,
  isDarkProfile: PropTypes.bool,
};
