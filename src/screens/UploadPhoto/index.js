import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, update} from 'firebase/database';
import {Button, Gap, Header, Link} from '../../components';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {colors, fonts, storeData} from '../../utils';
import {firebaseApp} from '../../config';

export default function UploadPhoto({route, navigation}) {
  const {uid, fullname, profession} = route.params;

  const [photoForDB, setPhotoForDB] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

  const handleImage = async () => {
    if (hasPhoto) {
      setPhoto(ILNullPhoto);
      setHasPhoto(false);
    } else {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        includeBase64: true,
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      });

      // if user cancel to upload
      if (result.didCancel) return;

      // if any error to upload file
      if (result.errorMessage) {
        return showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      }

      // if the file is too large (more than 2MB)
      if (result.assets[0].fileSize > 2097152) {
        return showMessage({
          message: 'This file is too large, max file is 2MB',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      }

      const source = {uri: result.assets[0].uri};
      setPhotoForDB(
        `data:${result.assets[0].type};base64, ${result.assets[0].base64}`,
      );
      setPhoto(source);
      setHasPhoto(true);
    }
  };

  const handleUploadAndContinue = () => {
    const db = getDatabase(firebaseApp);
    const dbRef = ref(db, `users/${uid}/`);
    update(dbRef, {photo: photoForDB});

    const data = {
      ...route.params,
      photo: photoForDB,
    };

    storeData('user', data);

    navigation.reset({
      routes: [{name: 'MainApp'}],
    });
  };

  const handleSkip = () => {
    navigation.reset({
      routes: [{name: 'MainApp'}],
    });
  };

  return (
    <View style={styles.screen}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={handleImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto ? (
              <IconRemovePhoto style={styles.icon} />
            ) : (
              <IconAddPhoto style={styles.icon} />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            variant="primary"
            onPress={handleUploadAndContinue}
            isDisabled={!hasPhoto}>
            Upload and Continue
          </Button>
          <Gap height={30} />
          <Link align="center" onPress={handleSkip}>
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
    borderRadius: 110 / 2,
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
