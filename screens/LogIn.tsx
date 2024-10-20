import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FIREBASE_AUTH } from '../FirebaseConfig'; // Import Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the sign-in function
import { useUser } from '../UserContext'; // Import the context for user state

// Define the types for the navigation prop
type RootStackParamList = {
  InsideLayout: undefined; // Updated to reflect the InsideLayout navigation
};

type LogInScreenProp = StackNavigationProp<RootStackParamList, 'InsideLayout'>;

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigation = useNavigation<LogInScreenProp>();
  const { setUsername } = useUser(); // Get setUsername from context

  const handleLogin = async () => {
    setErrorMessage(''); // Clear previous error message
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      setUsername(user.displayName || 'User'); // Set username in context, fallback to 'User'
      console.log('Logged in as:', user.email);
      navigation.navigate('InsideLayout'); // Navigate to InsideLayout after successful login
    } catch (error: unknown) {
      // Cast the error to a known type (Error) to safely access properties
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set error message if login fails
        console.log('Login Error:', error.message);
      } else {
        setErrorMessage('An unknown error occurred'); // Fallback for unknown errors
        console.log('Login Error: Unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} 
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red', // Style for error message
    marginBottom: 10,
  },
});
