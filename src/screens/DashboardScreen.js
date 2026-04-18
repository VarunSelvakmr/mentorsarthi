import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS } from "../theme";
import { useAuth } from "../context/AuthContext";

const BOOKINGS = [
  {
    id: "1",
    mentor: "Rahul Sharma",
    topic: "Career Guidance",
    date: "Apr 20, 2024",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    mentor: "Priya Patel",
    topic: "UX Portfolio Review",
    date: "Apr 18, 2024",
    time: "3:00 PM",
    status: "upcoming",
  },
  {
    id: "3",
    mentor: "Amit Singh",
    topic: "System Design",
    date: "Apr 10, 2024",
    time: "11:00 AM",
    status: "completed",
  },
];

const STATUS_COLORS = {
  upcoming: { bg: "#EDE9FE", text: COLORS.primary },
  completed: { bg: "#D1FAE5", text: "#059669" },
  cancelled: { bg: "#FEE2E2", text: "#DC2626" },
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  const filtered = BOOKINGS.filter((b) =>
    activeTab === "all" ? true : b.status === activeTab
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#4C1D95", "#6B46C1"]} style={styles.header}>
        <Text style={styles.headerTitle}>My Dashboard</Text>
        <Text style={styles.headerSub}>Track your mentoring sessions</Text>
      </LinearGradient>

      <View style={styles.body}>
        {/* Stats row */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, type: "timing", duration: 500 }}
          style={styles.statsRow}
        >
          {[
            { label: "Total Sessions", value: "12", icon: "📅" },
            { label: "Completed", value: "9", icon: "✅" },
            { label: "Upcoming", value: "3", icon: "⏰" },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </MotiView>

        {/* Tabs */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 200, type: "timing", duration: 400 }}
          style={styles.tabs}
        >
          {["upcoming", "completed", "all"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </MotiView>

        {/* Booking cards */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No sessions here yet</Text>
          </View>
        ) : (
          filtered.map((b, index) => (
            <MotiView
              key={b.id}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 80, type: "timing", duration: 400 }}
              style={styles.bookingCard}
            >
              <View style={styles.bookingHeader}>
                <View style={styles.mentorAvatar}>
                  <Text style={styles.mentorAvatarText}>
                    {b.mentor[0]}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.mentorName}>{b.mentor}</Text>
                  <Text style={styles.bookingTopic}>{b.topic}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: STATUS_COLORS[b.status]?.bg },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: STATUS_COLORS[b.status]?.text },
                    ]}
                  >
                    {b.status}
                  </Text>
                </View>
              </View>
              <View style={styles.bookingInfo}>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color={COLORS.textGray}
                  />
                  <Text style={styles.infoText}>{b.date}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={COLORS.textGray}
                  />
                  <Text style={styles.infoText}>{b.time}</Text>
                </View>
              </View>
              {b.status === "upcoming" && (
                <View style={styles.bookingActions}>
                  <TouchableOpacity style={styles.rescheduleBtn}>
                    <Text style={styles.rescheduleBtnText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.joinSessionBtn}>
                    <Text style={styles.joinSessionText}>Join Session</Text>
                  </TouchableOpacity>
                </View>
              )}
            </MotiView>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.screenBg },
  header: {
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: "#fff",
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.7)",
  },
  body: {
    backgroundColor: COLORS.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    padding: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    ...SHADOWS.sm,
  },
  statIcon: { fontSize: 22, marginBottom: 6 },
  statValue: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    textAlign: "center",
    marginTop: 2,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
  },
  tabTextActive: { color: "#fff" },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  mentorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  mentorAvatarText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  mentorName: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
  },
  bookingTopic: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontFamily: FONTS.medium },
  bookingInfo: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  infoText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  bookingActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  rescheduleBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: "center",
  },
  rescheduleBtnText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  joinSessionBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: "center",
  },
  joinSessionText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: "#fff",
  },
  empty: { alignItems: "center", paddingTop: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 10 },
  emptyText: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
  },
});
