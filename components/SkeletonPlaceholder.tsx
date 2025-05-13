import React from "react";
import { View, Image, Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const Skeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>
            Hello world
          </Text>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default Skeleton;
