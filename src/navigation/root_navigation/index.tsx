import { createStackNavigator } from "@react-navigation/stack";
import ContactDetails from "../../screen/caller_details";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="callerScreen" component={ContactDetails} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
