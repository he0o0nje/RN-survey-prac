import { useRecoilValue, useRecoilState } from "recoil";
import {
  checkboxCheckedState,
  formComponentDataState,
  radioSelectedState,
} from "../State";
import { Text, TextInput } from "@react-native-material/core";
import RadioGroup from "react-native-radio-buttons-group";
import Checkbox from "expo-checkbox";
import { Container, SurveyContainer, CheckContainer } from "./FormStyle";

export const PreviewForm = () => {
  const [radioselected, setRadioSelected] = useRecoilState(radioSelectedState);
  const [checkboxChecked, setCheckboxChecked] =
    useRecoilState(checkboxCheckedState);
  const formComponentData = useRecoilValue(formComponentDataState);

  return (
    <>
      {formComponentData.map((item, index) => {
        const { formType, formOptions, formTitle, required } = item;
        return (
          <Container elevation={3} key={index}>
            <Text style={{ marginTop: 12, marginLeft: 10 }}>
              {required
                ? `* ${formTitle || "제목없는 질문"}`
                : formTitle || "제목없는 질문"}
            </Text>
            {formType === "short" && (
              <SurveyContainer key={index}>
                <TextInput
                  variant="standard"
                  placeholder="단답형"
                  placeholderTextColor="#222"
                  maxLength={20}
                  style={{ width: "85%" }}
                />
              </SurveyContainer>
            )}
            {formType === "long" && (
              <SurveyContainer key={index}>
                <TextInput
                  variant="standard"
                  placeholder="장문형"
                  placeholderTextColor="#222"
                  multiline
                  textAlignVertical="bottom"
                  style={{ marginTop: 18 }}
                />
              </SurveyContainer>
            )}
            {formType === "radio" &&
              (formOptions.length === 0 ? (
                <CheckContainer>
                  <RadioGroup
                    radioButtons={[
                      {
                        id: String(0),
                        label: "",
                        value: undefined,
                        size: 20,
                        borderColor: "#888",
                        color: "rgba(85, 0, 196, 0.922)",
                      },
                    ]}
                    onPress={(selectedId) => setRadioSelected(selectedId)}
                    selectedId={radioselected}
                    containerStyle={{ marginTop: 10, marginLeft: -5 }}
                  />
                  <Text style={{ marginTop: 16 }}>옵션 1</Text>
                </CheckContainer>
              ) : (
                formOptions.map((option: string, optionIndex: number) => (
                  <CheckContainer key={optionIndex}>
                    <RadioGroup
                      radioButtons={[
                        {
                          id: String(optionIndex),
                          label: "",
                          value: option,
                          size: 20,
                          borderColor: "#888",
                          color: "rgba(85, 0, 196, 0.922)",
                        },
                      ]}
                      onPress={(selectedId) => setRadioSelected(selectedId)}
                      selectedId={radioselected}
                      containerStyle={{ marginTop: 10, marginLeft: -5 }}
                    />
                    <Text style={{ marginTop: 16 }}>
                      {option || `옵션 ${optionIndex + 1}`}
                    </Text>
                  </CheckContainer>
                ))
              ))}
            {formType === "checkbox" &&
              (formOptions.length === 0 ? (
                <CheckContainer>
                  <Checkbox
                    style={{
                      borderColor: "#888",
                      marginTop: 15,
                      marginRight: 10,
                      marginLeft: 5,
                    }}
                    value={checkboxChecked[0]}
                    onValueChange={(isChecked) => {
                      const newCheckboxChecked = [...checkboxChecked];
                      newCheckboxChecked[0] = isChecked;
                      setCheckboxChecked(newCheckboxChecked);
                    }}
                    color={
                      checkboxChecked[0] ? "rgba(85, 0, 196, 0.922)" : undefined
                    }
                  />
                  <Text style={{ marginTop: 16 }}>옵션 1</Text>
                </CheckContainer>
              ) : (
                formOptions.map((option: string, optionIndex: number) => (
                  <CheckContainer key={optionIndex}>
                    <Checkbox
                      style={{
                        borderColor: "#888",
                        marginTop: 15,
                        marginRight: 10,
                        marginLeft: 5,
                      }}
                      value={checkboxChecked[optionIndex]}
                      onValueChange={(isChecked) => {
                        const newCheckboxChecked = [...checkboxChecked];
                        newCheckboxChecked[optionIndex] = isChecked;
                        setCheckboxChecked(newCheckboxChecked);
                      }}
                      color={
                        checkboxChecked[optionIndex]
                          ? "rgba(85, 0, 196, 0.922)"
                          : undefined
                      }
                    />
                    <Text style={{ marginTop: 16 }}>
                      {option || `옵션 ${optionIndex + 1}`}
                    </Text>
                  </CheckContainer>
                ))
              ))}
          </Container>
        );
      })}
    </>
  );
};
