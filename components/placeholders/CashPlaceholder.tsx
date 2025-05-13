import { useReducer } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export default function CashPlaceholder() {
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
      {/* Row for Cash Earnings and Downlines */}
      <View style={styles.row}>
        {/* Cash Earnings Skeleton */}
        <View style={styles.skeletonContainer}>
          <Skeleton
            colorMode={colorMode}
            width={"100%"}
            height={100}
            radius={5}
          />
        </View>
        {/* Downlines Skeleton */}
        <View style={styles.skeletonContainer}>
          <Skeleton
            colorMode={colorMode}
            width={"100%"}
            height={100}
            radius={5}
          />
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    // padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  skeletonContainer: {
    width: "48%", // Keep a little margin between the two skeletons
    marginBottom: 10,
  },
});
