import React, { FunctionComponent } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { SearchResult } from '../Services/AxiosService';

type SearchResultProps = {
  data: SearchResult[];
};

export const SearchShowResult: FunctionComponent<SearchResultProps> = ({ data }) => {
  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{item.display}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 22,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 5,
    top: -26
  },
  resultContainer: {
    borderBottomColor: '#A3A3A3',
    borderBottomWidth: 1
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'Lato-Semibold',
    color: '#A3A3A3',
    paddingLeft: 40,
    paddingVertical: 5
  }
});
