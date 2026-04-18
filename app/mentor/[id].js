import React, { useState } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../src/components/Button";
import { COLORS, FONTS, SHADOWS } from "../../src/theme";

// Mock mentor data
const MENTOR_DATA = {
  "1": {
    id: "1", name: "Rahul Sharma", expertise: "Product Manager",
    company: "Google", experience: "8 years", rating: "4.9",
    reviews: 124, price: "800", sessions: 340,
    bio: "Former product manager at Google and Flipkart. I help aspiring PMs crack interviews, build roadmaps, and grow their careers in product management.",
    skills: ["Product Strategy", "User Research", "Roadmapping", "Agile", "Data Analysis"],
    slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
  },
  "2": {
    id: "2", name: "Priya Patel", expertise: "UX Designer",
    company: "Swiggy", experience: "6 years", rating: "4.8",
    reviews: 89, price: "600", sessions: 210,
    bio: "Lead UX Designer at Swiggy with expertise in mobile design systems. I help designers build strong portfolios and improve their design thinking.",
    skills: ["Figma", "User Testing", "Design Systems", "Prototyping", "Visual Design"],
    slots: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"],
  },
};

const REVIEWS = [
  { id: "1", user: "Arjun K.", rating: 5, text: "Extremely helpful session! Rahul gave me actionable advice.", date: "Apr 10" },
  { id: "2", user: "Meera S.", rating: 5, text: "Best mentor I've worked with. Very patient and knowledgeable.", date: "Apr 5" },
];

export default function MentorDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const mentor = MENTOR_DATA[id] || MENTOR_DATA["1"];

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const DATES = [
    { label: "Mon", date: "21" },
    { label: "Tue", date: "22" },
    { label: "Wed", date: "23" },
    { label: "Thu", date: "24" },
    { label: "Fri", date: "25" },
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert("Select Slot", "Please pick a date and time slot first.");
      return;
    }
    Alert.alert(
      "Confirm Booking",
      `Book session with ${mentor.name} on Apr ${selectedDate} at ${selectedSlot}?\n\nAmount: ₹${mentor.price}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Proceed to Pay",
          onPress: () =>
            Alert.alert("Payment", "Razorpay integration required (backend needed)."),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.screenBg }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top section */}
        <LinearGradient colors={["#4C1D95", "#6B46C1"]} style={styles.hero}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 14 }}
            style={styles.avatarBox}
          >
            <Text style={styles.avatarText}>{mentor.name[0]}</Text>
          </MotiView>
          <Text style={styles.mentorName}>{mentor.name}</Text>
          <Text style={styles.mentorRole}>
            {mentor.expertise} · {mentor.company}
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.heroStatText}>{mentor.rating}</Text>
            </View>
            <View style={styles.heroDot} />
            <Text style={styles.heroStatText}>{mentor.reviews} reviews</Text>
            <View style={styles.heroDot} />
            <Text style={styles.heroStatText}>{mentor.sessions} sessions</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Price + exp row */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 100, type: "timing", duration: 400 }}
            style={styles.infoRow}
          >
            <View style={styles.infoChip}>
              <Ionicons name="cash-outline" size={16} color={COLORS.primary} />
              <Text style={styles.infoChipText}>₹{mentor.price}/session</Text>
            </View>
            <View style={styles.infoChip}>
              <Ionicons name="briefcase-outline" size={16} color={COLORS.primary} />
              <Text style={styles.infoChipText}>{mentor.experience} exp</Text>
            </View>
          </MotiView>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{mentor.bio}</Text>

          {/* Skills */}
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsRow}>
            {mentor.skills.map((s, i) => (
              <View key={i} style={styles.skillChip}>
                <Text style={styles.skillText}>{s}</Text>
              </View>
            ))}
          </View>

          {/* Date picker */}
          <Text style={styles.sectionTitle}>Select Date</Text>
          <View style={styles.datesRow}>
            {DATES.map((d) => (
              <TouchableOpacity
                key={d.date}
                onPress={() => setSelectedDate(d.date)}
                style={[
                  styles.dateChip,
                  selectedDate === d.date && styles.dateChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.dateLabel,
                    selectedDate === d.date && { color: "#fff" },
                  ]}
                >
                  {d.label}
                </Text>
                <Text
                  style={[
                    styles.dateNum,
                    selectedDate === d.date && { color: "#fff" },
                  ]}
                >
                  {d.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time slots */}
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotsGrid}>
            {mentor.slots.map((s, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedSlot(s)}
                style={[
                  styles.slotChip,
                  selectedSlot === s && styles.slotChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedSlot === s && { color: "#fff" },
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Reviews</Text>
          {REVIEWS.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{r.user[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewUser}>{r.user}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {Array(r.rating).fill(0).map((_, i) => (
                      <Ionicons key={i} name="star" size={12} color="#F59E0B" />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>{r.date}</Text>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Session Price</Text>
          <Text style={styles.priceValue}>₹{mentor.price}</Text>
        </View>
        <Button
          title="Book Session"
          onPress={handleBook}
          size="md"
          style={{ flex: 1, marginLeft: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  avatarBox: {
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
  avatarText: { fontSize: 30, fontFamily: FONTS.bold, color: "#fff" },
  mentorName: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: "#fff",
    marginBottom: 4,
  },
  mentorRole: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 12,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroStat: { flexDirection: "row", alignItems: "center", gap: 4 },
  heroStatText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: "rgba(255,255,255,0.9)",
  },
  heroDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  body: {
    backgroundColor: COLORS.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    marginTop: 8,
  },
  infoChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    ...SHADOWS.sm,
  },
  infoChipText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
    marginBottom: 12,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    lineHeight: 22,
    marginBottom: 20,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  skillChip: {
    backgroundColor: COLORS.primaryTint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  datesRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  dateChip: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateLabel: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  dateNum: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    marginTop: 2,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  slotChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  slotChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    ...SHADOWS.sm,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  reviewAvatarText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  reviewUser: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
  },
  reviewDate: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
  },
  reviewText: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 28,
    ...SHADOWS.md,
  },
  priceLabel: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  priceValue: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
});
