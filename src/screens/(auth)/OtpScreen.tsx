import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { OTP_CONTENT } from '../../data/AuthData';

import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OtpScreen = ({ navigation }: Props): React.ReactElement => {
  const { login } = useAuth();

  const handleVerify = async (): Promise<void> => {
    await login('user@test.com', 'password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{OTP_CONTENT.title}</Text>
      <Pressable onPress={handleVerify} style={styles.button}>
        <Text style={styles.buttonText}>{OTP_CONTENT.primaryActionLabel}</Text>
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
    marginBottom: 16,
  },
  button: {
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
});

export default OtpScreen;
