import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Note } from './type';

import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Welcome from './screens/Welcome';
import CreateNote from './screens/CreateNote'; // Import your new NoteCreation screen
import { UserProvider } from './UserContext';
import { FIREBASE_AUTH } from './FirebaseConfig'; // Firebase config
import { onAuthStateChanged } from 'firebase/auth';


// Define a type for the stack's route parameter list
export type RootStackParamList = {
  Welcome: undefined;
  LogIn: undefined;
  SignUp: undefined;
  InsideLayout: undefined;
  Dashboard: { note?: Note };
  CreateNote: undefined; // Add NoteCreation to the types
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const InsideStack = createNativeStackNavigator<RootStackParamList>();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Dashboard" component={Dashboard} />
      <InsideStack.Screen name="CreateNote" component={CreateNote} />
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
