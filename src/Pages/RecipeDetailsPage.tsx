import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../App';
import { TopBar } from '../Components/TopBar';
import axiosService, { RecipeItem } from '../Services/AxiosService';

const RecipeDetailsPage: FunctionComponent = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipeDetailsPage'>>();
  const item = route.params.item;
  const { width, height } = useWindowDimensions();
  const [recipeDetails, setRecipeDetails] = useState<RecipeItem>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const getFeedData = async () => {
      try {
        setLoading(true);
        console.log(item.id);
        const details = await axiosService.fetchRecipeDetails(item.id.toString());
        setRecipeDetails(details);
        console.log(details);
      } catch (err) {
        console.warn('[RECIPE DATA]: ', err);
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
          <TopBar label={'Recipe Details'} showSearchBar={false} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('HomePage')}
          >
            <Image
              source={require('../../assets/images/back-button.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <ScrollView style={styles.recipeContainer} showsVerticalScrollIndicator={false}>
            <View>
              <Image source={{ uri: recipeDetails?.thumbnail_url }} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{recipeDetails?.name}</Text>
              <View style={styles.nutritionDetails}>
                <Text style={styles.nutritionText}>
                  {'Calories: '}
                  <Text>{recipeDetails?.nutrition.calories}</Text>
                  <Text>
                    {' Carbohydrates: '}
                    <Text>{recipeDetails?.nutrition.carbohydrates}</Text>
                  </Text>
                  <Text>
                    {' Fat: '}
                    <Text>{recipeDetails?.nutrition.fat}</Text>
                  </Text>
                  <Text>
                    {' Fiber: '}
                    <Text>{recipeDetails?.nutrition.fiber}</Text>
                  </Text>
                  <Text>
                    {' Protein: '}
                    <Text>{recipeDetails?.nutrition.protein}</Text>
                  </Text>
                  <Text>
                    {' Sugar: '}
                    <Text>{recipeDetails?.nutrition.sugar}</Text>
                  </Text>
                </Text>
              </View>
              <Text style={styles.descriptionTitle}>{'Description'}</Text>
              <Text style={styles.description}>{recipeDetails?.description}</Text>
              <Text style={styles.instructionsTitle}>{'Instructions'}</Text>
              <Text style={styles.instructionText}>
                {recipeDetails?.instruction?.position}
                <Text>{recipeDetails?.instruction?.text}</Text>
              </Text>
            </View>
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
  backButton: {
    top: -30,
    paddingTop: 20,
    paddingLeft: 20
  },
  backButtonImage: { width: 15, height: 25 },
  recipeContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1
  },
  recipeImage: {
    width: 285,
    height: 250,
    alignSelf: 'center',
    top: 27
  },
  recipeName: {
    fontSize: 20,
    fontFamily: 'Lato-Semibold',
    color: '#1B1B1B',
    top: 48,
    paddingLeft: 17
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: 'Lato-Semibold',
    color: '#1B1B1B',
    top: 70,
    paddingLeft: 17
  },
  description: {
    top: 85,
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#A3A3A3',
    backgroundColor: '#F7F7F7'
  },
  nutritionDetails: {
    paddingHorizontal: 17
  },
  nutritionText: {
    fontSize: 14,
    fontFamily: 'Lato-Semibold',
    color: '#A3A3A3',
    top: 55
  },
  instructionsTitle: {
    fontSize: 16,
    fontFamily: 'Lato-Semibold',
    color: '#1B1B1B',
    top: 110,
    paddingLeft: 17
  },
  instructionText: {
    top: 130,
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#A3A3A3',
    backgroundColor: '#F7F7F7'
  }
});

export default RecipeDetailsPage;
