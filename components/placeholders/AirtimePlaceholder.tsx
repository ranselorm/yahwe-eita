import { StyleSheet, View, useColorScheme } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export default function AirtimePlaceholder() {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  const colorMode = isDarkMode ? "dark" : "light";

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.container]}
      animate={{ backgroundColor: isDarkMode ? "#000000" : "#ffffff" }}
    >
      {/* <Skeleton colorMode={colorMode} radius="round" height={75} width={75} />
      <Spacer /> */}
      {/* <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} /> */}
      <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={"100%"} />
    </MotiView>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
