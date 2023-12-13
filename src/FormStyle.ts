import styled from "styled-components/native";
import { Surface, TextInput, IconButton } from "@react-native-material/core";
import { Menu, MenuOption } from "react-native-popup-menu";

export const Container = styled(Surface)`
  width: 100%;
  border-radius: 10px;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
`;

export const TitleContainer = styled(Surface)`
  width: 100%;
  padding: 0 20px 15px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  aspect-ratio: 2.5;
`;

export const Option = styled(TextInput)`
  flex: 1;
  margin: 0 60px 0 30px;
`;

export const Camera = styled(IconButton)`
  margin: 0 70px 0 30px;
`;

export const PopupMenu = styled(Menu)`
  width: 30px;
  height: 20px;
`;

export const MenuItem = styled(MenuOption)`
  padding: 18px;
`;

interface LongFormProps {
  Long: string;
}

export const Underline = styled.View<LongFormProps>`
  width: ${(props: { Long: string }) => (props.Long ? "80%" : "60%")};
  border-style: dotted;
  border-width: 0.8px;
  border-color: #bbb;
`;

export const SurveyContainer = styled.View`
  padding: 10px;
  width: 100%;
`;

export const CheckContainer = styled.View`
  margin-top: 12px;
  margin-bottom: 10px;
  width: 100%;
  flex-direction: row;
`;

export const BtnBox = styled.View`
  flex-direction: row;
`;

export const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10%;
  background-color: "rgba(85, 0, 196, 0.922)";
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const TextBox = styled.Text`
  color: #999;
  line-height: 30px;
`;

export const ChgContainer = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const ChgBtn = styled.Text``;

export const SwitchButton = styled.Switch`
  margin-left: 10px;
`;
