import { SafeAreaView, StyleSheet, ScrollView, View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { PreviewForm } from "./PreviewForm";
import { TitleContainer, TopBar } from "./FormStyle";
import { RootStackParamList } from "./Main";

type PreviewProps = StackScreenProps<RootStackParamList, "Preview">;

export const Preview: React.FC<PreviewProps> = ({ route, navigation }) => {
  const { title = "", description = "" } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TitleContainer elevation={1}>
          <TopBar />
          <Text style={styles.main}>{title || "제목 없는 설문지"}</Text>
          <Text style={styles.sub}>{description || "설문지 설명"}</Text>
        </TitleContainer>
        <PreviewForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227, 212, 247, 0.922)",
  },
  main: {
    fontSize: 35,
    width: "100%",
    height: "40%",
    marginTop: 40,
  },
  sub: {
    fontSize: 20,
  },
});
