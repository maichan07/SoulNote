import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Welcome from './screens/Welcome';
import { UserProvider } from './UserContext';
import { FIREBASE_AUTH } from './FirebaseConfig'; // Import your Firebase config
import { onAuthStateChanged } from 'firebase/auth'; // Import from Firebase Auth

// Define a type for the stack's route parameter list
export type RootStackParamList = {
  Welcome: undefined;
  LogIn: undefined;
  SignUp: undefined;
  InsideLayout: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const InsideStack = createNativeStackNavigator<RootStackParamList>();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Dashboard" component={Dashboard} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setIsAuthenticated(!!user); // Set authentication state
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "InsideLayout" : "Welcome"}>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="InsideLayout" component={InsideLayout} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </UserProvider>
  );
}
