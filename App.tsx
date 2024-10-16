import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import { UserProvider } from './UserContext'; // Import the UserProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Log In' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </UserProvider>
  );
}
