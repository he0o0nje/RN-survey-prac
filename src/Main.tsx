import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRecoilState } from "recoil";
import { titleState, descriptionState, formComponentDataState } from "../State";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Title } from "./Title";
import { FormComponent, FormType, FormComponentData } from "./FormComponent";

export type RootStackParamList = {
  Main: undefined;
  Preview: {
    title: string;
    description: string;
    formComponentsData: FormComponentData[];
  };
};

export const Main: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Preview">>();
  const [title, setTitle] = useRecoilState(titleState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const [formComponentData, setFormComponentData] = useRecoilState(
    formComponentDataState
  );

  // 폼을 추가하는 함수
  const handleAddForm = () => {
    const formKey = `form-${Date.now()}`;
    setFormComponentData((prevFormComponentData) => [
      ...prevFormComponentData,
      {
        key: formKey,
        props: {},
        formKey,
        formType: "short",
        formTitle: "제목없는 질문",
        formOptions: [],
        required: false,
      },
    ]);
  };

  // 모든 폼 뷰를 렌더링하는 함수
  const renderAllForms = () =>
    formComponentData.map((formComponent) => (
      <FormComponent
        key={formComponent.formKey}
        formKey={formComponent.formKey}
        formType={formComponent.formType}
        onChangeFormType={(type) =>
          handleChangeFormType(type, formComponent.formKey)
        }
        onCopyForm={() => handleCopyForm(formComponent.formKey)}
        onDeleteForm={() => handleDeleteForm(formComponent.formKey)}
        props={undefined}
      />
    ));

  // 현재 폼 유형이 변경될 때 호출되는 함수
  const handleChangeFormType = (type: FormType, formKey: string) => {
    setFormComponentData((prevFormComponentData) =>
      prevFormComponentData.map((formComponent) =>
        formComponent.formKey === formKey
          ? { ...formComponent, formType: type }
          : formComponent
      )
    );
  };

  // 폼을 복제하는 함수
  const handleCopyForm = (formKey: string) => {
    const formComponentToCopy = formComponentData.find(
      (item) => item.formKey === formKey
    );
    if (formComponentToCopy) {
      const newFormKey = `form-${Date.now()}`;
      setFormComponentData((prevFormComponentData) => [
        ...prevFormComponentData,
        {
          ...formComponentToCopy,
          key: newFormKey,
          formKey: newFormKey,
          formOptions: [...formComponentToCopy.formOptions],
        },
      ]);
    }
  };

  // 폼을 삭제하는 함수
  const handleDeleteForm = (formKey: string) => {
    setFormComponentData((prevFormComponentData) =>
      prevFormComponentData.filter(
        (formComponent) => formComponent.formKey !== formKey
      )
    );
  };

  // 미리보기 버튼
  const handlePreview = () => {
    navigation.navigate("Preview", {
      title,
      description,
      formComponentsData: formComponentData,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title />
        <View>
          {renderAllForms()}
          <View style={styles.btnBox}>
            <TouchableOpacity style={styles.button} onPress={handlePreview}>
              <Text>미리 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddForm}>
              <Text>설문 추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227, 212, 247, 0.922)",
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "30%",
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
});
