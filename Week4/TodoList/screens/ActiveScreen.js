import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

export default function ActiveScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text>Active Screen</Text>
    </View>
  );
}

ActiveScreen.navigationOptions = {
  title: 'Active',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 22,
  },
  headerStyle: {
    backgroundColor: '#0079be',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});