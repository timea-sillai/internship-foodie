import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { RootStackParamList } from '../App';
import { checkIdToken } from '../Services/FirebaseService';

const SplashPage: FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const isValidToken = await checkIdToken();
        if (isValidToken) {
          navigation.navigate('SignInPage');
        } else {
          navigation.navigate('SignUpPage');
        }
      } catch (error) {
        console.warn('[SPLASH]', error);
      }
    };
    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/grocery-sgi.png')}
        style={{ ...styles.image, width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    flex: 1
  },
  image: {
    height: 330
  }
});

export default SplashPage;
