import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import MentorCard from "../components/MentorCard";
import { COLORS, FONTS, SHADOWS } from "../theme";

const ALL_MENTORS = [
  { id: "1", name: "Rahul Sharma", expertise: "Product Manager", rating: "4.9", price: "800", category: "Business" },
  { id: "2", name: "Priya Patel", expertise: "UX Designer", rating: "4.8", price: "600", category: "Design" },
  { id: "3", name: "Amit Singh", expertise: "Full Stack Dev", rating: "4.7", price: "700", category: "Tech" },
  { id: "4", name: "Sneha Roy", expertise: "Data Scientist", rating: "4.9", price: "900", category: "Tech" },
  { id: "5", name: "Vikram Nair", expertise: "Career Coach", rating: "4.6", price: "500", category: "Career" },
  { id: "6", name: "Anjali Gupta", expertise: "Marketing Lead", rating: "4.8", price: "650", category: "Marketing" },
];

const FILTERS = ["All", "Tech", "Business", "Design", "Career", "Marketing"];

export default function MentorsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = ALL_MENTORS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.expertise.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || m.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find a Mentor</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color={COLORS.textGray} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or skill..."
          placeholderTextColor={COLORS.textLight}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={COLORS.textGray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, filter === f && styles.chipTextActive]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      <Text style={styles.resultCount}>
        {filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found
      </Text>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 80, type: "timing", duration: 400 }}
            style={{ paddingHorizontal: 16 }}
          >
            <MentorCard
              mentor={item}
              onPress={() =>
                router.push({
                  pathname: "/mentor/[id]",
                  params: { id: item.id },
                })
              }
            />
          </MotiView>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No mentors found</Text>
            <Text style={styles.emptySubtext}>Try a different search</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.screenBg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textDark,
  },
  filtersScroll: { marginBottom: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
  },
  chipTextActive: { color: "#fff" },
  resultCount: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  emptyState: { alignItems: "center", paddingTop: 60 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
  },
  emptySubtext: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    marginTop: 4,
  },
});
