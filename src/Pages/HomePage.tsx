import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native';
import { CarouselBlock } from '../Components/CarouselBlock';
import { TopBar } from '../Components/TopBar';
import axiosService, { FeedData } from '../Services/AxiosService';

const HomePage: FunctionComponent = () => {
  const { width, height } = useWindowDimensions();
  const [feedData, setFeedData] = useState<FeedData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFeedData = async () => {
      try {
        setLoading(true);
        const feed = await axiosService.fetchFeed();
        setFeedData(feed);
      } catch (err) {
        console.warn('[FEED DATA]: ', err);
      } finally {
        setLoading(false);
      }
    };
    getFeedData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={{ position: 'absolute', height: height, width: width }}
      />
      {loading ? (
        <ActivityIndicator color='#999999' size='large' />
      ) : (
        <>
          <TopBar showSearchBar={true} />
          <ScrollView style={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
            {feedData?.carousels?.map(carousel => {
              return <CarouselBlock data={carousel} />;
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  carouselName: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: '#1B1B1B',
    paddingLeft: 22,
    paddingTop: 16
  },
  categoriesContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1
  },
  carousel: {
    paddingLeft: 22
  }
});

export default HomePage;
