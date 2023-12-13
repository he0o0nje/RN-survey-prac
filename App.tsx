import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import { Main, RootStackParamList } from "./src/Main";
import { Preview } from "./src/Preview";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <RecoilRoot>
      <ActionSheetProvider>
        <MenuProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </MenuProvider>
      </ActionSheetProvider>
    </RecoilRoot>
  );
}
