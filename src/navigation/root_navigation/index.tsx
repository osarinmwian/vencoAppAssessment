import { createStackNavigator } from "@react-navigation/stack";
import ContactDetails from "../../screen/caller_details";
import CallerDetailsScreen from "../../screen/caller_details";
import HomeScreen from "../../screen/home";

const RootStack = createStackNavigator();

const RootNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen
          name="CallerDetailsScreen"
          component={CallerDetailsScreen}
        />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
