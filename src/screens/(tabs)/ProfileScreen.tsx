import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ProfileScreen;
