import { RecoilState, atom } from "recoil";
import { FormComponentData } from "./src/FormComponent";

export const radioSelectedState = atom({
  key: "selectedState",
  default: "",
});

export const radioOptionsState = atom({
  key: "radioOptionsState",
  default: [
    {
      id: "1",
      label: "",
      value: "option1",
      size: 20,
      borderColor: "#888",
      color: "rgba(85, 0, 196, 0.922)",
    },
  ],
});

export const checkboxCheckedState = atom({
  key: "checkboxCheckedState",
  default: [false],
});

export const checkboxOptionsState = atom({
  key: "checkboxOptionsState",
  default: [undefined],
});

export const titleState = atom({
  key: "titleState",
  default: "",
});

export const descriptionState = atom({
  key: "descriptionState",
  default: "",
});

export const formTitleState = atom({
  key: "formTitleState",
  default: "",
});

export const formOptionsState = atom<string[]>({
  key: "formOptionsState",
  default: [],
});

export const formComponentDataState: RecoilState<FormComponentData[]> = atom({
  key: "formComponentDataState",
  default: [] as FormComponentData[],
});
