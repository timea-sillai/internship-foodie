import React, { FunctionComponent, useState } from 'react';
import { View, Image, useWindowDimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodieTextInput } from '../Components/FoodieTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signUp } from '../Services/FirebaseService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const SignUpPage: FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const userSignUp = async () => {
    try {
      await signUp(name, email, password);
      navigation.navigate('HomePage');
    } catch (err) {
      console.warn('[SIGNUP]', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/grocery-sgu.png')}
        style={{ ...styles.image, width }}
      />
      <KeyboardAwareScrollView style={styles.keyboardView}>
        <Text style={styles.titleText}>Sign Up</Text>
        <FoodieTextInput label={'Name'} value={name} onChangeValue={setName} />
        <FoodieTextInput label={'Email'} value={email} onChangeValue={setEmail} />
        <FoodieTextInput
          rightIcon={require('../../assets/images/password-icon.jpeg')}
          label={'Password'}
          value={password}
          onChangeValue={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={userSignUp}>
          <Text style={styles.textButton}>{'SIGN UP'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('SignInPage')}
        >
          <Text style={styles.textDown}>
            {'Already have an Account? '}
            <Text style={styles.textSignIn}>{'Sign In'}</Text>
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
    marginBottom: 8,
    marginTop: 330
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
    marginTop: 64
  },
  textDown: {
    fontSize: 14,
    fontFamily: 'Lato-Semibold',
    color: '#777777',
    textAlign: 'center'
  },
  textSignIn: {
    fontSize: 14,
    color: '#40AA54'
  }
});

export default SignUpPage;
