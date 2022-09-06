import React, { FunctionComponent } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { FeedCarousel } from '../Services/AxiosService';
import { CarouselItem } from './CarouselItem';

type CarouselBlockProps = {
  data: FeedCarousel;
};

export const CarouselBlock: FunctionComponent<CarouselBlockProps> = ({ data }) => {
  return (
    <>
      <Text style={styles.carouselName}>{data?.name}</Text>
      <ScrollView horizontal style={styles.carousel} showsHorizontalScrollIndicator={false}>
        {data?.items?.map(item => {
          return <CarouselItem thumbnailUrl={item.thumbnail_url} name={item.name} />;
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  carouselName: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: '#1B1B1B',
    paddingLeft: 22,
    paddingTop: 16
  },
  carousel: {
    paddingHorizontal: 22
  }
});
