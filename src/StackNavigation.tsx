import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import AddTodoScreen from "./screens/AddTodoScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;