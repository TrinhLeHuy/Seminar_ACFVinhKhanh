/**
 * Mobile App Entry Point
 */

import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setGetAuthTokenFn } from '../../shared/api';
import { HomeScreen } from './screens/HomeScreen';
import { LocationDetailScreen } from './screens/LocationDetailScreen';
import { QRScannerScreen } from './screens/QRScannerScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
  },
});

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Địa Điểm' }}
      />
      <Stack.Screen
        name="LocationDetail"
        component={LocationDetailScreen}
        options={{ title: 'Chi Tiết Địa Điểm' }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{ title: 'Quét QR Code' }}
      />
    </Stack.Navigator>
  );
}

function AppContent() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#f97316',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen
          name="Locations"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
            tabBarLabel: 'Địa Điểm',
          }}
        />
        <Tab.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>📷</Text>,
            tabBarLabel: 'Quét QR',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  // Inject AsyncStorage into shared API on mount
  useEffect(() => {
    setGetAuthTokenFn(async () => {
      try {
        return await AsyncStorage.getItem('token');
      } catch (error) {
        console.error('Error getting token from AsyncStorage:', error);
        return null;
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
