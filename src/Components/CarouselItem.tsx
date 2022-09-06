import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type CarouselItemProps = {
  thumbnailUrl: string;
  name: string;
};

export const CarouselItem: FunctionComponent<CarouselItemProps> = ({ thumbnailUrl, name }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: 100, marginRight: 7, marginTop: 14 },
  thumbnail: {
    height: 70,
    width: 70,
    marginHorizontal: 14,
    alignSelf: 'center'
  },
  name: {
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
    color: '#1B1B1B',
    marginTop: 5,
    textAlign: 'center'
  }
});
