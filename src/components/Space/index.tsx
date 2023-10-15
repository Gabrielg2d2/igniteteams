import { View } from "react-native";

type SpaceProps = {
  space: number;
};

export function Space(props: SpaceProps) {
  return <View style={{ height: props.space }} />;
}
