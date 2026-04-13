import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from './src/theme/colors';
import HomeScreen from './src/screens/HomeScreen';
import AreaCalculatorScreen from './src/screens/AreaCalculatorScreen';
import TextCalculatorScreen from './src/screens/TextCalculatorScreen';
import CenterCalculatorScreen from './src/screens/CenterCalculatorScreen';
import RollCalculatorScreen from './src/screens/RollCalculatorScreen';

const Stack = createNativeStackNavigator();

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.primary,
  },
};

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.surface,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    ...typography.subtitle,
    color: colors.text,
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  contentStyle: {
    backgroundColor: colors.background,
  },
  animation: 'slide_from_right',
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AreaCalculator"
          component={AreaCalculatorScreen}
          options={{ title: 'Izračun m²' }}
        />
        <Stack.Screen
          name="TextCalculator"
          component={TextCalculatorScreen}
          options={{ title: 'Iz teksta' }}
        />
        <Stack.Screen
          name="CenterCalculator"
          component={CenterCalculatorScreen}
          options={{ title: 'Sredina' }}
        />
        <Stack.Screen
          name="RollCalculator"
          component={RollCalculatorScreen}
          options={{ title: 'Izračun role' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
