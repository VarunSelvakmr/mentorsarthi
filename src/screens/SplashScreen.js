import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "../theme";
import { useAuth } from "../context/AuthContext";

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  return (
    <LinearGradient
      colors={["#4C1D95", "#6B46C1", "#9333EA"]}
      style={styles.container}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        style={styles.logoBox}
      >
        {/* Logo icon placeholder */}
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>MS</Text>
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400, type: "timing", duration: 600 }}
      >
        <Text style={styles.appName}>MentorSarthi</Text>
        <Text style={styles.tagline}>Your Growth, Our Guidance</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1200, type: "timing", duration: 500 }}
        style={styles.footer}
      >
        <Text style={styles.footerText}>by Enorvia Global</Text>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  iconText: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: "#fff",
    letterSpacing: 1,
  },
  appName: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 40,
  },
  footerText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.5)",
  },
});
