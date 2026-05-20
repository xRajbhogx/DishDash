import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { LOGIN_CONTENT } from '../../data/AuthData';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{LOGIN_CONTENT.title}</Text>
      <Pressable
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{LOGIN_CONTENT.primaryActionLabel}</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.replace('Tabs')}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>{LOGIN_CONTENT.secondaryActionLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#111827',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#111827',
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
