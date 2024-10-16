import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Define the types for the navigation prop
type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
};

type WelcomeScreenProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

export default function Welcome() {
  const navigation = useNavigation<WelcomeScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SoulNote</Text>
      <Text style={styles.mantra}>Make notes, make it yours!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={() => navigation.navigate('LogIn')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mantra: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10, // Add vertical spacing between buttons
    width: '80%',       // Adjust width if needed
  },
});
