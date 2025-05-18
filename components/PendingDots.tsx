import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";

export default function PendingDots() {
  const dot1 = useSharedValue(1);
  const dot2 = useSharedValue(1);
  const dot3 = useSharedValue(1);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );
    dot2.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(0.2, { duration: 500 })),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );
    dot3.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(0.2, { duration: 500 })),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );
  }, []);

  const styleDot = (dot: any) =>
    useAnimatedStyle(() => ({
      opacity: dot.value,
    }));

  return (
    <View className="bg-[#c7a12e] w-16 h-16 items-center justify-center rounded-full">
      <View className="flex-row justify-center items-center space-x-3">
        <Animated.View
          style={[
            {
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#fff",
            },
            styleDot(dot1),
          ]}
        />
        <Animated.View
          style={[
            {
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#fff",
            },
            styleDot(dot2),
          ]}
        />
        <Animated.View
          style={[
            {
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#fff",
            },
            styleDot(dot3),
          ]}
        />
      </View>
    </View>
  );
}
