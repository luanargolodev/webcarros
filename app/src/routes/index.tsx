import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Favorites } from "../screens/Favorites";

export type StackParamList = {
  Home: undefined;
  Details: {
    id: string;
  };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
