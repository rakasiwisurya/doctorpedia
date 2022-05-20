import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {getDatabase, onValue, push, ref} from 'firebase/database';
import {ChatItem, Header, InputChat, Loading} from '../../components';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from '../../utils';
import {firebaseApp} from '../../config';

import 'moment/locale/id';
moment.locale('id');

export default function Chatting({navigation, route}) {
  const {uid, fullname, profession, photo} = route.params;

  const [text, setText] = useState('');
  const [user, setUser] = useState(null);
  const [chatData, setChatData] = useState([]);

  const flatListRef = useRef();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user && uid) getChatting();
  }, [user, uid]);

  const db = getDatabase(firebaseApp);

  const getUser = () => getData('user').then(res => setUser(res));

  const getChatting = () => {
    let chatID = '';

    if (user.role === 'doctor') {
      chatID = `${uid}_${user.uid}`;
    } else {
      chatID = `${user.uid}_${uid}`;
    }

    onValue(
      ref(db, `chattings/${chatID}/allChat/`),
      snapshots => {
        if (snapshots.val()) {
          const dataSnapshots = snapshots.val();
          const allDataChat = [];

          Object.keys(dataSnapshots).forEach(key => {
            const dataChat = dataSnapshots[key];
            const newDataChats = [];

            Object.keys(dataChat).forEach(itemChat => {
              newDataChats.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allDataChat.push({
              id: key,
              data: newDataChats,
            });
          });

          setChatData(allDataChat.reverse());
        }
      },
      error => {
        console.error(error);
        showError(error.message);
      },
    );
  };

  const handleSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: text,
    };

    let chatID = '';

    if (user.role === 'doctor') {
      // note: userId_doctorId
      chatID = `${uid}_${user.uid}`;
    } else {
      // note: userId_doctorId
      chatID = `${user.uid}_${uid}`;
    }

    const urlFirebase = `chattings/${chatID}/allChat/${setDateChat(today)}`;

    push(ref(db, urlFirebase), data)
      .then(() => {
        setText('');
        flatListRef.current.scrollToOffset({animated: false, offset: 0});
      })
      .catch(error => {
        console.error(error);
        showError(error.message);
      });
  };

  const renderChat = ({item}) => (
    <View>
      <Text style={styles.chatDate}>
        {moment(item.id).format('dddd, DD MMMM YYYY')}
      </Text>
      {item.data.map(itemChat => (
        <ChatItem
          key={itemChat.id}
          isMe={itemChat.data.sendBy === user.uid}
          text={itemChat.data.chatContent}
          time={itemChat.data.chatTime}
          photo={itemChat.data.photo && {uri: itemChat.data.photo}}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header
        title={fullname}
        category={profession}
        photo={{uri: photo}}
        onPress={() => navigation.goBack()}
        isDarkProfile
      />
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          keyExtractor={item => item.id}
          data={chatData}
          renderItem={renderChat}
          inverted
        />
      </View>
      <InputChat
        value={text}
        onChangeText={value => setText(value)}
        onButtonPress={handleSend}
      />
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string,
      fullname: PropTypes.string,
      profession: PropTypes.string,
      photo: PropTypes.string,
    }),
  }),
};
