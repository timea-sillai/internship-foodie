import React, { FunctionComponent, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

type FoodieTextInputProps = {
  value: string;
  onChangeValue(value: string): void;
  rightIcon?: ImageSourcePropType;
  leftIcon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  placeholder?: string;
  label?: string;
  textInputStyle?: ViewStyle;
};

export const FoodieTextInput: FunctionComponent<FoodieTextInputProps> = ({
  label,
  value,
  onChangeValue,
  rightIcon,
  leftIcon,
  secureTextEntry,
  placeholder,
  textInputStyle
}) => {
  const [secureText, setSecureText] = useState<boolean>(secureTextEntry);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {rightIcon && (
        <TouchableOpacity style={styles.rightIcon} onPress={() => setSecureText(!secureText)}>
          <Image
            source={rightIcon}
            style={{ ...styles.icon, tintColor: secureText ? 'blue' : 'black' }}
          />
        </TouchableOpacity>
      )}
      {leftIcon && <Image source={leftIcon} style={styles.leftIcon} />}
      <TextInput
        style={[styles.input, textInputStyle]}
        onChangeText={onChangeValue}
        value={value}
        secureTextEntry={secureText}
        blurOnSubmit={false}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 22, marginTop: 26, justifyContent: 'center', bottom: 25 },
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
    paddingHorizontal: 7,
    fontFamily: 'Lato-Semibold'
  },
  icon: {
    width: 20,
    height: 17
  },
  leftIcon: {
    width: 16,
    height: 16,
    tintColor: '#1B1B1B',
    alignSelf: 'center',
    position: 'absolute',
    left: 13,
    zIndex: 1
  },
  rightIcon: {
    alignSelf: 'center',
    position: 'absolute',
    right: 14,
    zIndex: 1
  }
});
