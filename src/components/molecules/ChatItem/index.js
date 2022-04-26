import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import IsMe from './IsMe';
import Other from './Other';

export default function ChatItem({isMe}) {
  if (isMe) {
    return <IsMe />;
  }

  return <Other />;
}

ChatItem.propTypes = {
  isMe: PropTypes.bool,
};
