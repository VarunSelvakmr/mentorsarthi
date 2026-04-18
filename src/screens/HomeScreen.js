import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MentorCard from "../components/MentorCard";
import { COLORS, FONTS, SHADOWS } from "../theme";
import { useAuth } from "../context/AuthContext";

// Mock data – replace with real API calls
const CATEGORIES = [
  { id: "1", name: "Tech", icon: "💻" },
  { id: "2", name: "Business", icon: "📊" },
  { id: "3", name: "Design", icon: "🎨" },
  { id: "4", name: "Career", icon: "🚀" },
  { id: "5", name: "Marketing", icon: "📣" },
  { id: "6", name: "Finance", icon: "💰" },
];

const TOP_MENTORS = [
  { id: "1", name: "Rahul Sharma", expertise: "Product Manager", rating: "4.9", price: "800" },
  { id: "2", name: "Priya Patel", expertise: "UX Designer", rating: "4.8", price: "600" },
  { id: "3", name: "Amit Singh", expertise: "Full Stack Dev", rating: "4.7", price: "700" },
  { id: "4", name: "Sneha Roy", expertise: "Data Scientist", rating: "4.9", price: "900" },
];

const WORKSHOPS = [
  { id: "1", title: "Crack Your Dream Job", date: "Apr 22", mentor: "Rahul Sharma", seats: 12 },
  { id: "2", title: "Startup Pitch Workshop", date: "Apr 25", mentor: "Priya Patel", seats: 8 },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#4C1D95", "#6B46C1"]} style={styles.header}>
        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{greeting()},</Text>
              <Text style={styles.userName}>
                {user?.name?.split(" ")[0] || "Learner"} 👋
              </Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color={COLORS.textGray} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search mentors, skills..."
              placeholderTextColor={COLORS.textLight}
              style={styles.searchInput}
            />
          </View>
        </MotiView>
      </LinearGradient>

      <View style={styles.body}>
        {/* Categories */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, type: "timing", duration: 500 }}
        >
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -24, paddingHorizontal: 24 }}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? null : cat.id
                  )
                }
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === cat.id && { color: "#fff" },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </MotiView>

        {/* Top Mentors */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: "timing", duration: 500 }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Mentors</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/mentors")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -24, paddingHorizontal: 24 }}
          >
            {TOP_MENTORS.map((m) => (
              <MentorCard
                key={m.id}
                mentor={m}
                horizontal
                onPress={() =>
                  router.push({ pathname: "/mentor/[id]", params: { id: m.id } })
                }
              />
            ))}
          </ScrollView>
        </MotiView>

        {/* Upcoming Workshops */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, type: "timing", duration: 500 }}
        >
          <Text style={styles.sectionTitle}>Upcoming Workshops</Text>
          {WORKSHOPS.map((w) => (
            <TouchableOpacity key={w.id} style={styles.workshopCard}>
              <LinearGradient
                colors={["#EDE9FE", "#F9F5FF"]}
                style={styles.workshopGradient}
              >
                <View style={styles.workshopLeft}>
                  <Text style={styles.workshopDate}>{w.date}</Text>
                  <Text style={styles.workshopTitle}>{w.title}</Text>
                  <Text style={styles.workshopMentor}>by {w.mentor}</Text>
                </View>
                <View style={styles.workshopRight}>
                  <View style={styles.seatsBox}>
                    <Text style={styles.seatsNum}>{w.seats}</Text>
                    <Text style={styles.seatsLabel}>seats left</Text>
                  </View>
                  <TouchableOpacity style={styles.joinBtn}>
                    <Text style={styles.joinBtnText}>Join</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </MotiView>
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
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.75)",
  },
  userName: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: "#fff",
    marginTop: 2,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59E0B",
    borderWidth: 1.5,
    borderColor: "#6B46C1",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textDark,
  },
  body: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLORS.screenBg,
    marginTop: -12,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
    marginBottom: 14,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 8,
  },
  seeAll: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: { fontSize: 16, marginRight: 6 },
  categoryName: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  workshopCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  workshopGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  workshopLeft: { flex: 1 },
  workshopDate: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginBottom: 4,
  },
  workshopTitle: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  workshopMentor: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  workshopRight: { alignItems: "center", marginLeft: 12 },
  seatsBox: { alignItems: "center", marginBottom: 8 },
  seatsNum: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  seatsLabel: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  joinBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  joinBtnText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: "#fff",
  },
});
