import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS } from "../theme";

export default function MentorCard({ mentor, onPress, horizontal = false }) {
  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 14,
          marginRight: 12,
          width: 160,
          ...SHADOWS.sm,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: COLORS.primaryTint,
            marginBottom: 8,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: COLORS.primaryTint,
          }}
        >
          {mentor.avatar ? (
            <Image
              source={{ uri: mentor.avatar }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: FONTS.bold,
                  color: COLORS.primary,
                }}
              >
                {mentor.name?.[0]?.toUpperCase() || "M"}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 13,
            color: COLORS.textDark,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {mentor.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 11,
            color: COLORS.textGray,
            textAlign: "center",
            marginTop: 2,
          }}
          numberOfLines={1}
        >
          {mentor.expertise}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS.medium,
              color: COLORS.textDark,
              marginLeft: 3,
            }}
          >
            {mentor.rating || "4.8"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        ...SHADOWS.sm,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.primaryTint,
          overflow: "hidden",
          borderWidth: 2,
          borderColor: COLORS.primaryTint,
          marginRight: 14,
        }}
      >
        {mentor.avatar ? (
          <Image
            source={{ uri: mentor.avatar }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONTS.bold,
                color: COLORS.primary,
              }}
            >
              {mentor.name?.[0]?.toUpperCase() || "M"}
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 15,
            color: COLORS.textDark,
          }}
        >
          {mentor.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 13,
            color: COLORS.textGray,
            marginTop: 2,
          }}
        >
          {mentor.expertise}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Ionicons name="star" size={13} color="#F59E0B" />
          <Text
            style={{
              fontSize: 13,
              fontFamily: FONTS.medium,
              color: COLORS.textDark,
              marginLeft: 3,
              marginRight: 12,
            }}
          >
            {mentor.rating || "4.8"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: FONTS.semiBold,
              color: COLORS.primary,
            }}
          >
            ₹{mentor.price || "500"}/hr
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      </View>
    </TouchableOpacity>
  );
}
