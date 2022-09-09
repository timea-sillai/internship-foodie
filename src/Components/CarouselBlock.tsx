import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../App';
import { FeedCarousel } from '../Services/AxiosService';
import { CarouselItem } from './CarouselItem';

type CarouselBlockProps = {
  data: FeedCarousel;
};

export const CarouselBlock: FunctionComponent<CarouselBlockProps> = ({ data }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <>
      <Text style={styles.carouselName}>{data?.name}</Text>
      <ScrollView horizontal style={styles.carousel} showsHorizontalScrollIndicator={false}>
        {data?.items?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('RecipeDetailsPage', { item: item })}
            >
              <CarouselItem thumbnailUrl={item.thumbnail_url} name={item.name} />
            </TouchableOpacity>
          );
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
