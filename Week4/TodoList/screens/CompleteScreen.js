import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

export default function CompleteScreen() {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text>Complete Screen</Text>
    </View>
  );
}

CompleteScreen.navigationOptions = {
  title: 'Complete',
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