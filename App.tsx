import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigation/root_navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootNavigation />
    </NavigationContainer>
  );
}
