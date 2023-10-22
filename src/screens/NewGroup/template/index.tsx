import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Input } from "@components/Input";
import { Space } from "@components/Space";

import { KeyboardAvoidingView, Platform } from "react-native";
import * as S from "./styles";

export type NewGroupTemplateProps = {
  newGroup: string;
  goBack: () => void;
  handleCreateGroup: () => void;
  setNewGroup: (value: string) => void;
};

export function NewGroupTemplate(props: NewGroupTemplateProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <Header showBackButton onPressBackButton={props.goBack} />

        <S.Content>
          <S.Icon />
          <Highlight
            title="Nova turma"
            subtitle="Crie a turma para adicionar as pessoas"
          />

          <Input
            placeholder="Nome da turma"
            value={props.newGroup}
            onChangeText={props.setNewGroup}
            onSubmitEditing={props.handleCreateGroup}
            returnKeyType="send"
          />

          <Space space={20} />

          <Button
            title="Criar"
            disabled={!props.newGroup.length}
            onPress={props.handleCreateGroup}
          />
        </S.Content>
      </S.Container>
    </KeyboardAvoidingView>
  );
}
