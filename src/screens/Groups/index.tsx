import { MainGroup } from "@domain/Group/main";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useCallback, useState } from "react";
import { GroupType, GroupsTemplate, GroupsTemplateProps } from "./template";

export function Groups() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [mainGroup] = useState(new MainGroup());
  const { navigateToNewGroups, navigateToPlayers } = useNavigationCustom();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadGroups() {
        const groupsList = await mainGroup.listGroups();
        if (isActive) {
          setGroups(groupsList);
        }
      }

      loadGroups();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const propsTemplate: GroupsTemplateProps = {
    groups,
    navigateToNewGroups,
    navigateToPlayers,
  };

  return <GroupsTemplate {...propsTemplate} />;
}
