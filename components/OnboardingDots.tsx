import React from "react";
import { View, StyleSheet } from "react-native";

interface OnboardingDotsProps {
  total: number;
  activeIndex: number;
}

const OnboardingDots: React.FC<OnboardingDotsProps> = ({
  total,
  activeIndex,
}) => {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    position: "absolute",
    right: "20%",
    left: "20%",
    bottom: 80,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#dc6115",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});

export default OnboardingDots;
