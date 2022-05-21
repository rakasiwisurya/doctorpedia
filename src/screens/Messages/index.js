import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {child, get, getDatabase, onValue, ref} from 'firebase/database';
import {List} from '../../components';
import {colors, fonts, getData, showError} from '../../utils';
import {firebaseApp} from '../../config';

export default function Messages({navigation}) {
  const [user, setUser] = useState(null);
  const [chatHistories, setChatHistories] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) getMessages();
  }, [user]);

  const getUser = () => getData('user').then(res => setUser(res));

  const getMessages = () => {
    const urlHistory = `messages/${user.uid}/`;
    const db = getDatabase(firebaseApp);
    const dbRef = ref(db);
    onValue(
      child(dbRef, urlHistory),
      async snapshots => {
        if (snapshots.val()) {
          try {
            const data = snapshots.val();

            const newData = [];

            const promises = Object.keys(data).map(async key => {
              const urlUidDoctor = `doctors/${data[key].uidPartner}`;
              const detailDoctor = await get(child(dbRef, urlUidDoctor));

              newData.push({
                ...data[key],
                id: key,
                detailDoctor: detailDoctor.val(),
              });
            });

            await Promise.all(promises);

            const descendingSortData = newData.sort(
              (a, b) => new Date(b.lastChatDate) - new Date(a.lastChatDate),
            );

            setChatHistories(descendingSortData);
          } catch (error) {
            console.error(error);
            showError(error.message);
          }
        }
      },
      error => {
        console.error(error);
        showError(error.message);
      },
    );
  };

  const renderChatList = ({item}) => {
    const data = {
      uid: item.detailDoctor.uid,
      fullname: item.detailDoctor.fullname,
      profession: item.detailDoctor.profession,
      photo: item.detailDoctor.photo,
    };

    return (
      <List
        key={item.id}
        profile={{uri: item.detailDoctor.photo}}
        name={item.detailDoctor.fullname}
        desc={item.lastContentChat}
        onPress={() => navigation.navigate('Chatting', data)}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={chatHistories}
          renderItem={renderChatList}
        />
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
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Messages.propTypes = {
  navigation: PropTypes.object,
};
