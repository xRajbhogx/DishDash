import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrdersScreen = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
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

export default OrdersScreen;
