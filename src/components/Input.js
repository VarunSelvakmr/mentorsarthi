import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../theme";

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error = null,
  leftIcon = null,
  style = {},
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && (
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 13,
            color: COLORS.textDark,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: error
            ? COLORS.error
            : focused
            ? COLORS.primary
            : COLORS.border,
          borderRadius: 12,
          backgroundColor: focused ? "#FAFAFA" : COLORS.white,
          paddingHorizontal: 14,
        }}
      >
        {leftIcon && (
          <View style={{ marginRight: 8 }}>{leftIcon}</View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            paddingVertical: 13,
            fontSize: 14,
            fontFamily: FONTS.regular,
            color: COLORS.textDark,
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.textGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={{
            color: COLORS.error,
            fontSize: 12,
            fontFamily: FONTS.regular,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
