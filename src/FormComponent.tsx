import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  formComponentDataState,
  formTitleState,
  radioSelectedState,
  checkboxCheckedState,
  checkboxOptionsState,
  formOptionsState,
  radioOptionsState,
} from "../State";
import {
  Text,
  TextInput,
  Divider,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Entypo } from "@expo/vector-icons";
import { MenuOptions, MenuTrigger } from "react-native-popup-menu";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import Checkbox from "expo-checkbox";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  Container,
  SurveyContainer,
  Underline,
  TextBox,
  SwitchContainer,
  SwitchButton,
  PopupMenu,
  MenuItem,
  Option,
  BtnBox,
  CheckContainer,
  ChgContainer,
  ChgBtn,
} from "./FormStyle";

export type FormType = "short" | "long" | "radio" | "checkbox" | null;

export interface FormComponentData {
  key: string;
  props: any;
  formKey: string;
  formType: FormType;
  formTitle: string;
  formOptions: string[];
  required: boolean;
}

export interface FormComponentProps {
  key: string;
  props: any;
  formKey: string;
  formType: FormType | null;
  onChangeFormType?: (type: FormType) => void;
  onCopyForm?: (formKey: string) => void;
  onDeleteForm?: (formKey: string) => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  formKey,
  formType,
  onChangeFormType,
  onCopyForm,
  onDeleteForm,
}) => {
  const [radioselected, setRadioSelected] = useRecoilState(radioSelectedState);
  const [radioOptions, setRadioOptions] = useRecoilState(radioOptionsState);
  const [checkboxChecked, setCheckboxChecked] =
    useRecoilState(checkboxCheckedState);
  const [checkboxOptions, setCheckboxOptions] =
    useRecoilState(checkboxOptionsState);
  const [formTitle, setFormTitle] = useRecoilState(formTitleState);
  const [formOptions, setFormOptions] = useRecoilState(formOptionsState);
  const { showActionSheetWithOptions } = useActionSheet();
  const [formComponentData, setFormComponentData] = useRecoilState<
    FormComponentData[]
  >(formComponentDataState);

  // 팝업 메뉴에서 선택한 항목 처리
  const handleMenuItemClick = (index: number) => {
    switch (index) {
      case 0:
        handleCopyForm();
        break;
      case 1:
        handleDeleteForm();
        break;
      default:
        break;
    }
  };

  const handleCopyForm = () => {
    if (onCopyForm) {
      onCopyForm(formKey);
    }
  };

  const handleDeleteForm = () => {
    if (onDeleteForm) {
      onDeleteForm(formKey);
    }
  };

  const showFormOptions = () => {
    const options = ["단답형", "장문형", "객관식 질문", "체크박스", "취소"];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex !== cancelButtonIndex) {
          let selectedFormType: FormType | null = null;

          switch (selectedIndex) {
            case 0:
              selectedFormType = "short";
              break;
            case 1:
              selectedFormType = "long";
              break;
            case 2:
              selectedFormType = "radio";
              break;
            case 3:
              selectedFormType = "checkbox";
              break;
            default:
              break;
          }

          // 선택한 폼 유형을 App.tsx로 전달
          if (onChangeFormType) {
            onChangeFormType(selectedFormType);
          }
        }
      }
    );
  };

  useEffect(() => {
    const newFormComponentData = formComponentData.map((item) =>
      item.formKey === formKey ? { ...item, formTitle } : item
    );
    setFormComponentData(newFormComponentData);
  }, [formTitle]);

  useEffect(() => {
    const newFormComponentData = formComponentData.map((item) =>
      item.formKey === formKey ? { ...item, formOptions } : item
    );
    setFormComponentData(newFormComponentData);
  }, [formOptions]);

  const formComponent = formComponentData.find(
    (item) => item.formKey === formKey
  );
  if (!formComponent) return null;

  return (
    <Container elevation={3}>
      <TextInput
        placeholder="제목없는 질문"
        placeholderTextColor="#333"
        value={formComponent.formTitle}
        onChangeText={(text: string) => {
          // formTitle 변경 시 formComponentData 업데이트
          const newFormComponentData = formComponentData.map((item) =>
            item.formKey === formKey ? { ...item, formTitle: text } : item
          );
          setFormComponentData(newFormComponentData);
        }}
      />
      <BtnBox>
        <IconButton
          icon={(props) => <Icon name="camera" {...props} />}
          style={{ marginTop: 12, marginRight: 10 }}
        />
        {formType && (
          <ChgContainer onPress={showFormOptions}>
            <ChgBtn>
              {formType === "short" && "단답형"}
              {formType === "long" && "장문형"}
              {formType === "radio" && "객관식 질문"}
              {formType === "checkbox" && "체크박스"}
            </ChgBtn>
          </ChgContainer>
        )}
      </BtnBox>
      {formType === "short" && (
        <SurveyContainer>
          <TextBox>단답형 텍스트</TextBox>
          <Underline />
        </SurveyContainer>
      )}
      {formType === "long" && (
        <SurveyContainer>
          <TextBox>장문형 텍스트</TextBox>
          <Underline Long />
        </SurveyContainer>
      )}
      {formType === "radio" && (
        <>
          {radioOptions.map((option, index) => (
            <CheckContainer key={index}>
              <RadioGroup
                radioButtons={[option]}
                onPress={setRadioSelected}
                selectedId={radioselected}
                containerStyle={{ marginTop: 10, marginRight: -20 }}
              />
              <Option
                key={`${formComponent.formKey}-option-${index}`}
                variant="standard"
                placeholder={`옵션 ${index + 1}`}
                placeholderTextColor="#222"
                value={formComponent.formOptions[index]}
                onChangeText={(text: string) => {
                  // formOptions 변경 시 formComponentData 업데이트
                  const newFormOptions = [...formComponent.formOptions];
                  newFormOptions[index] = text;
                  const newFormComponentData = formComponentData.map((item) =>
                    item.formKey === formKey
                      ? { ...item, formOptions: newFormOptions }
                      : item
                  );
                  setFormComponentData(newFormComponentData);
                }}
              />
            </CheckContainer>
          ))}
        </>
      )}
      {formType === "checkbox" && (
        <>
          {checkboxOptions.map((option, index) => (
            <CheckContainer key={index}>
              <Checkbox
                style={{
                  borderColor: "#888",
                  marginTop: 15,
                  marginRight: -12,
                  marginLeft: 10,
                }}
                value={checkboxChecked[index]}
                onValueChange={(isChecked) => {
                  const newCheckboxChecked = [...checkboxChecked];
                  newCheckboxChecked[index] = isChecked;
                  setCheckboxChecked(newCheckboxChecked);
                }}
                color={
                  checkboxChecked[index] ? "rgba(85, 0, 196, 0.922)" : undefined
                }
              />
              <Option
                key={`${formComponent.formKey}-option-${index}`}
                variant="standard"
                placeholder={`옵션 ${index + 1}`}
                placeholderTextColor="#222"
                value={formComponent.formOptions[index]}
                onChangeText={(text: string) => {
                  // formOptions 변경 시 formComponentData 업데이트
                  const newFormOptions = [...formComponent.formOptions];
                  newFormOptions[index] = text;
                  const newFormComponentData = formComponentData.map((item) =>
                    item.formKey === formKey
                      ? { ...item, formOptions: newFormOptions }
                      : item
                  );
                  setFormComponentData(newFormComponentData);
                }}
              />
            </CheckContainer>
          ))}
        </>
      )}
      <Divider style={{ marginTop: 20, marginBottom: 15 }} />
      <SwitchContainer>
        <Text>필수</Text>
        <SwitchButton
          trackColor={{ false: "#767577", true: "rgba(227, 212, 247, 0.922)" }}
          thumbColor={
            formComponent.required ? "rgba(85, 0, 196, 0.922)" : "#fff"
          }
          value={formComponent.required}
          onValueChange={() => {
            const newFormComponentData = formComponentData.map((item) =>
              item.formKey === formKey
                ? { ...item, required: !item.required }
                : item
            );
            setFormComponentData(newFormComponentData);
          }}
        />
        <PopupMenu>
          <MenuTrigger>
            <Entypo
              name="dots-three-vertical"
              size={18}
              color="#666"
              style={{ marginLeft: 8 }}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                width: 110,
                marginTop: -30,
              },
            }}
          >
            <MenuItem
              onSelect={() => handleMenuItemClick(0)}
              text="항목 복제"
            />
            <Divider />
            <MenuItem onSelect={() => handleMenuItemClick(1)} text="삭제" />
          </MenuOptions>
        </PopupMenu>
      </SwitchContainer>
    </Container>
  );
};
