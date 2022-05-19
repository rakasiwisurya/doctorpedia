import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import moment from 'moment';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts, parseArray, showError} from '../../utils';
import {firebaseApp} from '../../config';

export default function Doctor({navigation}) {
  const db = getDatabase(firebaseApp);

  const [news, setNews] = useState([]);
  const [doctorCategories, setDoctorCategories] = useState([]);
  const [topRatedDoctors, setTopRatedDoctors] = useState([]);

  useEffect(() => {
    getNews();
    getDoctorCategories();
    getTopRatedDoctors();
  }, []);

  const getNews = () => {
    onValue(
      ref(db, 'news/'),
      snapshots => {
        if (snapshots.val()) {
          const data = snapshots.val().map(snapshot => {
            const newDate = new Date(snapshot.date);

            return {
              ...snapshot,
              date: moment(newDate).calendar({
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'DD MMM YYYY',
              }),
              image: {uri: snapshot.image},
            };
          });
          setNews(data);
        }
      },
      error => {
        console.error(error);
        showError(error.message);
      },
      {onlyOnce: true},
    );
  };

  const getDoctorCategories = () => {
    onValue(
      ref(db, 'doctor_categories/'),
      snapshots => snapshots.val() && setDoctorCategories(snapshots.val()),
      error => {
        console.error(error);
        showError(error.message);
      },
      {onlyOnce: true},
    );
  };

  const getTopRatedDoctors = () => {
    onValue(
      query(ref(db, 'doctors/'), orderByChild('rate'), limitToLast(3)),
      snapshots =>
        snapshots.val() && setTopRatedDoctors(parseArray(snapshots.val())),
      error => {
        console.error(error);
        showError(error.message);
      },
      {onlyOnce: true},
    );
  };

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
                {doctorCategories.map(item => (
                  <DoctorCategory
                    key={`category-${item.id}`}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor', item)}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {topRatedDoctors.map(doctor => (
              <RatedDoctor
                key={doctor.uid}
                avatar={{uri: doctor.photo}}
                name={doctor.fullname}
                category={doctor.profession}
                rate={doctor.rate}
                onPress={() => navigation.navigate('DoctorProfile', doctor)}
              />
            ))}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.length > 0 &&
            news.map(item => (
              <NewsItem
                key={`news-${item.id}`}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            ))}
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
