import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';
import {
  IconEditProfile,
  IconHelp,
  IconLanguange,
  IconLogout,
  IconNext,
  IconRate,
} from '../../../assets';

export default function List({profile, name, desc, isNext, onPress, icon}) {
  const Icon = () => {
    if (icon === 'edit-profile') return <IconEditProfile />;
    if (icon === 'language') return <IconLanguange />;
    if (icon === 'rate') return <IconRate />;
    if (icon === 'help') return <IconHelp />;
    if (icon === 'logout') return <IconLogout />;
    return <IconEditProfile />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {isNext && <IconNext />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});

List.propTypes = {
  profile: Image.propTypes.source,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  isNext: PropTypes.bool,
  onPress: PropTypes.func,
  icon: PropTypes.string,
};
