import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SHADOWS } from "../theme";

export default function Button({
  title,
  onPress,
  loading = false,
  variant = "primary", // primary | outline | ghost
  size = "md",
  disabled = false,
  icon = null,
  style = {},
}) {
  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13 },
    md: { paddingVertical: 14, paddingHorizontal: 24, fontSize: 15 },
    lg: { paddingVertical: 17, paddingHorizontal: 32, fontSize: 16 },
  };

  const sz = sizes[size];

  if (variant === "outline") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          {
            borderWidth: 1.5,
            borderColor: COLORS.primary,
            borderRadius: 14,
            paddingVertical: sz.paddingVertical,
            paddingHorizontal: sz.paddingHorizontal,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text
          style={{
            color: COLORS.primary,
            fontSize: sz.fontSize,
            fontFamily: FONTS.semiBold,
          }}
        >
          {loading ? "Loading..." : title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      colors={
        disabled ? ["#C4B5FD", "#C4B5FD"] : [COLORS.primary, COLORS.primaryLight]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          borderRadius: 14,
          ...SHADOWS.sm,
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={{
          paddingVertical: sz.paddingVertical,
          paddingHorizontal: sz.paddingHorizontal,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
            <Text
              style={{
                color: "#fff",
                fontSize: sz.fontSize,
                fontFamily: FONTS.semiBold,
              }}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}
