import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FoodieTextInput } from './FoodieTextInput';
import { SearchShowResult } from './SearchShowResult';
import axiosService, { SearchResult } from '../Services/AxiosService';

type TopBarProps = {
  label?: string;
  showSearchBar?: boolean;
};

export const TopBar: FunctionComponent<TopBarProps> = ({ label, showSearchBar }) => {
  const [searchText, setSearchText] = useState<string>('');
  const { width } = useWindowDimensions();
  const [searchResults, setSearchResults] = useState<SearchResult[]>();

  const getSearchData = async () => {
    try {
      const searchResult = await axiosService.fetchAutocompleteSuggestions(searchText);
      setSearchResults(searchResult);
    } catch (err) {
      console.warn('[SEARCH DATA]: ', err);
    } finally {
    }
  };

  return (
    <View style={{ ...styles.container, marginTop: useSafeAreaInsets().top }}>
      <Image
        source={require('../../assets/images/topbar-background.png')}
        style={{ ...styles.backgroundImage, width }}
      />
      {label && <Text style={styles.label}>{label}</Text>}
      {showSearchBar && (
        <>
          <FoodieTextInput
            value={searchText}
            onChangeValue={newText => {
              setSearchText(newText);
              getSearchData();
            }}
            leftIcon={require('../../assets/images/Search.png')}
            placeholder={'Search Groceries...'}
            textInputStyle={{ paddingLeft: 40, backgroundColor: '#FAFAFA' }}
          />
          <SearchShowResult data={searchResults} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  label: {
    color: '#1B1B1B',
    backgroundColor: '#F5F5F5',
    fontFamily: 'Lato-Bold',
    fontSize: 26,
    alignSelf: 'center'
  },
  backgroundImage: {
    height: 93,
    position: 'absolute'
  }
});
