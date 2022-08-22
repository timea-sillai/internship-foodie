import React, { FunctionComponent } from 'react';
import { Button, View } from 'react-native';
import { signUp } from '../Services/FirebaseService';

const SplashPage: FunctionComponent = () => {
  return (
    <View>
      <Button title='signin' onPress={() => signUp('jane.doe2@example.com', 'Test123!')} />
    </View>
  );
};

export default SplashPage;
