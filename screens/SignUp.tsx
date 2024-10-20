import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FIREBASE_AUTH } from '../FirebaseConfig'; // Import Firebase Auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the create user function
import { useUser } from '../UserContext'; // Import the context

type RootStackParamList = {
  InsideLayout: undefined; // Updated to reflect the InsideLayout navigation
};

type SignUpScreenProp = StackNavigationProp<RootStackParamList, 'InsideLayout'>;

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigation = useNavigation<SignUpScreenProp>();
  const { setUsername: setUserNameContext } = useUser(); // Use context to set username

  // useEffect to check if passwords match
  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  }, [password, confirmPassword]); // Depend on password and confirmPassword

  const handleSignUp = async () => {
    if (errorMessage) {
      console.log(errorMessage); // Log error message if passwords don't match
      return;
    }

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      setUserNameContext(username); // Set username in context
      navigation.navigate('InsideLayout'); // Navigate to InsideLayout after successful sign up
    } catch (error: unknown) {
      // Cast the error to a known type (Error) to safely access properties
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set error message if sign up fails
        console.log('Sign Up Error:', error.message);
      } else {
        console.log('Sign Up Error: Unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} 
      <Button title="Sign Up" onPress={handleSignUp} />
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
