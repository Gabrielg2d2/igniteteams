import { StatusBar } from "expo-status-bar";
import { Groups } from "@screens/Groups";
import { ThemeProvider } from "styled-components";
import { themeLight } from "src/theme";

export default function App() {
  return (
    <>
      <ThemeProvider theme={themeLight}>
        <Groups />
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
