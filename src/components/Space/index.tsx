import { View } from "react-native";

type SpaceProps = {
  height: number;
};

export function Space(props: SpaceProps) {
  return <View style={{ height: props.height }} />;
}
