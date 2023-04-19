import { createStackNavigator } from "@react-navigation/stack";
import CallerDetailsScreen from "../../screen/caller_details";
import HomeScreen from "../../screen/home";
import { RouteParmaList } from "../parma_list";

const RootStack = createStackNavigator<RouteParmaList>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen
          name="CallerDetailsScreen"
          component={CallerDetailsScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
