import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './Source/context/AppContext';

import AuthScreen from './Source/screens/AuthScreen';

import ChatScreen from './Source/screens/ChatScreen';
import MemoryScreen from './Source/screens/MemoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Memory" component={MemoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
