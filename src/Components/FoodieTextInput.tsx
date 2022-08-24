import React, { FunctionComponent, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageSourcePropType,
  TouchableOpacity
} from 'react-native';

type FoodieTextInputProps = {
  label: string;
  value: string;
  onChangeValue(value: string): void;
  rightIcon?: ImageSourcePropType;
  secureTextEntry?: boolean;
};

export const FoodieTextInput: FunctionComponent<FoodieTextInputProps> = ({
  label,
  value,
  onChangeValue,
  rightIcon,
  secureTextEntry
}) => {
  const [secureText, setSecureText] = useState<boolean>(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {rightIcon && (
        <TouchableOpacity style={styles.touchable} onPress={() => setSecureText(!secureText)}>
          <Image
            source={rightIcon}
            style={{ ...styles.icon, tintColor: secureText ? 'blue' : 'black' }}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        onChangeText={onChangeValue}
        value={value}
        secureTextEntry={secureText}
        blurOnSubmit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 22, marginTop: 26, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 5,
    height: 48,
    paddingLeft: 16
  },
  label: {
    position: 'absolute',
    top: -10,
    zIndex: 1,
    left: 8,
    color: '#A3A3A3',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 7
  },
  icon: {
    width: 20,
    height: 17
  },
  touchable: {
    alignSelf: 'center',
    position: 'absolute',
    right: 16,
    zIndex: 1
  }
});
