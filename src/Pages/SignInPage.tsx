import React, { FunctionComponent, useState } from 'react';
import { View, Image, useWindowDimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { FoodieTextInput } from '../Components/FoodieTextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { signIn } from '../Services/FirebaseService';

const SignInPage: FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const userSignIn = async () => {
    try {
      await signIn(email, password);
      navigation.navigate('SignUpPage');
    } catch (err) {
      console.warn('[SIGNIN]', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/grocery-sgi.png')}
        style={{ ...styles.image, width }}
      />
      <KeyboardAwareScrollView style={styles.keyboardView}>
        <Text style={styles.titleText}>{'Sign In'}</Text>
        <FoodieTextInput label={'Email'} value={email} onChangeValue={setEmail} />
        <FoodieTextInput
          rightIcon={require('../../assets/images/password-icon.jpeg')}
          label={'Password'}
          value={password}
          onChangeValue={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={userSignIn}>
          <Text style={styles.textButton}>{'SIGN IN'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('SignUpPage')}
        >
          <Text style={styles.textDown}>
            {"Don't have an Account? "}
            <Text style={styles.textSignUp}>{'Sign Up'}</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center'
  },
  image: {
    height: 330,
    position: 'absolute',
    top: 0
  },
  keyboardView: {
    height: '100%'
  },
  titleText: {
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#1B1B1B',
    textAlign: 'center',
    marginTop: 384,
    bottom: 34
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 5,
    height: 48
  },
  button: {
    marginHorizontal: 22,
    height: 48,
    marginTop: 25,
    backgroundColor: '#40AA54',
    borderRadius: 5
  },
  textButton: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 14
  },
  touchable: {
    marginTop: 84
  },
  textDown: {
    fontSize: 14,
    fontFamily: 'Lato-Semibold',
    color: '#777777',
    textAlign: 'center'
  },
  textSignUp: {
    fontSize: 14,
    color: '#40AA54'
  }
});

export default SignInPage;
