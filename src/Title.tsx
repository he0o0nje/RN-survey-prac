import { TextInput, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { titleState, descriptionState } from "../State";
import { TitleContainer, TopBar } from "./FormStyle";

export const Title: React.FC = () => {
  const [title, setTitle] = useRecoilState(titleState);
  const [description, setDescription] = useRecoilState(descriptionState);

  return (
    <TitleContainer elevation={1}>
      <TopBar />
      <TextInput
        placeholder="제목 없는 설문지"
        placeholderTextColor="#222"
        style={styles.main}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        placeholder="설문지 설명"
        placeholderTextColor="#777"
        style={styles.sub}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
    </TitleContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    fontSize: 35,
    width: "100%",
    height: "55%",
    marginTop: 20,
  },
  sub: {
    fontSize: 20,
  },
});
