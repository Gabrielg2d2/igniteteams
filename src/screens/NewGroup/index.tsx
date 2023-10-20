import { MainGroup } from "@domain/Group/main";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useState } from "react";
import { NewGroupTemplate, NewGroupTemplateProps } from "./template";

export function NewGroup() {
  const [newGroup, setNewGroup] = useState("");
  const [mainGroup] = useState(new MainGroup());
  const { navigateToPlayers, goBack } = useNavigationCustom();

  async function handleCreateGroup() {
    const { errors, messages } = await mainGroup.createNewGroup(newGroup);
    if (errors.length) {
      for (const error of errors) {
        alert(error);
      }
      return;
    }

    for (const message of messages) {
      alert(message);
    }

    navigateToPlayers(newGroup);
  }

  const propsTemplate: NewGroupTemplateProps = {
    goBack,
    handleCreateGroup,
    newGroup,
    setNewGroup,
  };

  return <NewGroupTemplate {...propsTemplate} />;
}
