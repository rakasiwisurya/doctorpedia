import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import IsMe from './IsMe';
import Other from './Other';

export default function ChatItem({isMe, text, time, photo}) {
  if (isMe) {
    return <IsMe text={text} time={time} />;
  }

  return <Other text={text} time={time} photo={photo} />;
}

ChatItem.propTypes = {
  isMe: PropTypes.bool,
  text: PropTypes.string,
  time: PropTypes.string,
  photo: PropTypes.oneOfType([PropTypes.object, Image.propTypes.source]),
};
