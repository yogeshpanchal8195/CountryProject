import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Details from './Details';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='country'>
        <Stack.Screen
          name="country"
          component={Home}
          options={{title: 'Country'}}
        />
        <Stack.Screen name="details" component={Details} options={{title: 'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
