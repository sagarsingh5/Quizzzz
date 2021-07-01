import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import QuizScreen from '../screens/QuizScreen';
import SubmitScreen from '../screens/SubmitScreen';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // transitionSpec: {
        //   open: config,
        //   close: config,
        // }
      }}
      headerMode={false}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="SubmitScreen" component={SubmitScreen} />
    </Stack.Navigator>
  );
};
export default StackNavigation;
