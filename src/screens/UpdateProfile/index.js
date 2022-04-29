import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors} from '../../utils';

export default function UpdateProfile({navigation}) {
  return (
    <View style={styles.screen}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove />
          <Gap height={26} />
          <Input label="Full Name" />
          <Gap height={24} />
          <Input label="Pekerjaan" />
          <Gap height={24} />
          <Input label="Email Address" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={40} />
          <Button
            variant="primary"
            onPress={() => navigation.goBack('UserProfile')}>
            Save Profile
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});

UpdateProfile.propTypes = {
  navigation: PropTypes.object,
};
