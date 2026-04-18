import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, FONTS, SHADOWS } from "../theme";
import { useAuth } from "../context/AuthContext";

const MENU_ITEMS = [
  { icon: "person-outline", label: "Edit Profile", route: null },
  { icon: "calendar-outline", label: "My Bookings", route: "/(tabs)/dashboard" },
  { icon: "notifications-outline", label: "Notifications", route: null },
  { icon: "shield-checkmark-outline", label: "Privacy Policy", route: null },
  { icon: "document-text-outline", label: "Terms of Service", route: null },
  { icon: "help-circle-outline", label: "Help & Support", route: null },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#4C1D95", "#6B46C1"]} style={styles.header}>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 14 }}
          style={styles.avatarSection}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || "User Name"}</Text>
          <Text style={styles.email}>{user?.email || "user@email.com"}</Text>
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Text style={styles.editAvatarText}>Edit Profile</Text>
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>

      <View style={styles.body}>
        {/* Stats */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, type: "timing", duration: 500 }}
          style={styles.statsCard}
        >
          {[
            { label: "Sessions", value: "12" },
            { label: "Mentors", value: "4" },
            { label: "Hours", value: "18" },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < 2 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </MotiView>

        {/* Menu */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: "timing", duration: 500 }}
          style={styles.menuCard}
        >
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => item.route && router.push(item.route)}
              style={[
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
              ]}
            >
              <View style={styles.menuIconBox}>
                <Ionicons name={item.icon} size={19} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          ))}
        </MotiView>

        {/* Logout */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 350, type: "timing", duration: 400 }}
        >
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </MotiView>

        <Text style={styles.version}>MentorSarthi v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.screenBg },
  header: {
    paddingTop: 56,
    paddingBottom: 32,
    alignItems: "center",
  },
  avatarSection: { alignItems: "center" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    color: "#fff",
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 14,
  },
  editAvatarBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.5)",
  },
  editAvatarText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: "#fff",
  },
  body: {
    padding: 16,
    backgroundColor: COLORS.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 8,
    ...SHADOWS.sm,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.error,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginBottom: 32,
  },
});
