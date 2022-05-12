import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts} from '../../utils';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  JSONCategoryDoctor,
} from '../../assets';

export default function Doctor({navigation}) {
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.replace('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {JSONCategoryDoctor.data.map(item => (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor')}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <RatedDoctor
              avatar={DummyDoctor1}
              name="Alexa Rachel"
              category="Pediatrician"
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <RatedDoctor
              avatar={DummyDoctor2}
              name="Sunny Frank"
              category="Dentist"
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <RatedDoctor
              avatar={DummyDoctor3}
              name="Poe Minn"
              category="Podiatrist"
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <Gap height={30} />
        </View>
      </ScrollView>
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
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 215,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});

Doctor.propTypes = {
  navigation: PropTypes.object,
};
