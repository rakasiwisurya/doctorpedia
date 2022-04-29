import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Gap, Header, Link} from '../../components';
import {ILNullPhoto} from '../../assets';
import {IconAddPhoto} from '../../assets';
import {colors, fonts} from '../../utils';

export default function UploadPhoto({navigation}) {
  return (
    <View style={styles.screen}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image source={ILNullPhoto} style={styles.avatar} />
            <IconAddPhoto style={styles.icon} />
          </View>
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.profession}>Product Designer</Text>
        </View>
        <View>
          <Button
            variant="primary"
            onPress={() => navigation.replace('MainApp')}>
            Upload and Continue
          </Button>
          <Gap height={30} />
          <Link align="center" onPress={() => navigation.replace('MainApp')}>
            Skip for this
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
  },
  icon: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});

UploadPhoto.propTypes = {
  navigation: PropTypes.object,
};
