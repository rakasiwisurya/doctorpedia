import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {IconStar} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function RatedDoctor({avatar, name, category, rate, onPress}) {
  let [stars, setStars] = useState([]);

  const ratedStar = () => {
    for (let i = 1; i <= rate; i++) {
      setStars(prevState => [...prevState, i]);
    }
  };

  useEffect(() => {
    ratedStar();
  }, [rate]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rate}>
        {stars.map((values, index) => (
          <IconStar key={index} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  profile: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 2,
  },
  rate: {
    flexDirection: 'row',
  },
});

RatedDoctor.propTypes = {
  avatar: Image.propTypes.source,
  name: PropTypes.string,
  category: PropTypes.string,
  rate: PropTypes.number,
  onPress: PropTypes.func,
};
