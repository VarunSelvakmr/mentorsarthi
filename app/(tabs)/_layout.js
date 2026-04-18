import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../src/theme";

function TabIcon({ name, focused, label }) {
  return (
    <View style={styles.tabIcon}>
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={focused ? COLORS.primary : COLORS.textGray}
      />
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? COLORS.primary : COLORS.textGray },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="mentors"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="people" focused={focused} label="Mentors" />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="calendar" focused={focused} label="Sessions" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person" focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: "#6B46C1",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: FONTS.medium,
  },
});
