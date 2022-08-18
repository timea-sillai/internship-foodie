import { Platform } from 'react-native';

/**
 * Null safe utility function to transform a text to uppercase, or empty if the text is null.
 */
export function uppercaseText(text?: string): string {
  if (text) {
    return text.toUpperCase();
  } else {
    return '';
  }
}
export function lowercaseText(text?: string): string {
  if (text) {
    return text.toLowerCase();
  } else {
    return '';
  }
}

export function sentenceCaseText(text?: string): string {
  if (text) {
    let newText = text.toLowerCase();
    return newText.replace(newText[0], newText[0].toUpperCase());
  } else {
    return '';
  }
}

export function trimmedText(text?: string): string {
  if (text) {
    return text.trim();
  } else {
    return '';
  }
}

export function insertTextAt(source: string, index: number, insert: string) {
  return source.substring(0, index) + insert + source.substring(index);
}

/**
 *  Check if the textInput editable functionality should be disabled on init and
 *  revert it when the component is mounted.
 *  In this way, we can avoid the TextInput field crash on Xiaomi devices.
 */
export function shouldDisableEditableOnInit(fieldName?: string): boolean {
  return Platform.OS === 'android' && lowercaseText(fieldName) === 'email';
}
