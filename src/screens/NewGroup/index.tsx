import { MainGroup } from "@domain/Group/main";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useState } from "react";
import { Alert } from "react-native";
import { NewGroupTemplate, NewGroupTemplateProps } from "./template";

export function NewGroup() {
  const [newGroup, setNewGroup] = useState("");
  const [mainGroup] = useState(new MainGroup());
  const { navigateToPlayers, goBack } = useNavigationCustom();

  async function handleCreateGroup() {
    if (!newGroup.trim().length) {
      setNewGroup("");
    }

    const { errors, messages, data } = await mainGroup.createNewGroup(newGroup);
    if (errors.length) {
      for (const error of errors) {
        Alert.alert("Erro ao criar grupo", error);
      }
      return;
    }

    for (const message of messages) {
      Alert.alert("Sucesso", message);
      const idGroup = data?.newGroup.id ?? "";
      const namGroup = data?.newGroup.name ?? "";
      navigateToPlayers(namGroup, idGroup);
    }
  }

  const propsTemplate: NewGroupTemplateProps = {
    goBack,
    handleCreateGroup,
    newGroup,
    setNewGroup,
  };

  return <NewGroupTemplate {...propsTemplate} />;
}
