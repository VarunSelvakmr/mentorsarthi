import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS, FONTS } from "../theme";
import { useAuth } from "../context/AuthContext";
import { loginApi } from "../services/api";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await loginApi(email, password);
      await login(res.user, res.token);
      router.replace("/(tabs)/home");
    } catch (err) {
      Alert.alert("Login Failed", err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header gradient */}
        <LinearGradient
          colors={["#4C1D95", "#6B46C1"]}
          style={styles.header}
        >
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <View style={styles.logoRow}>
              <View style={styles.logoMini}>
                <Text style={styles.logoMiniText}>MS</Text>
              </View>
              <Text style={styles.brandName}>MentorSarthi</Text>
            </View>
            <Text style={styles.headerTitle}>Welcome back! 👋</Text>
            <Text style={styles.headerSubtitle}>
              Sign in to continue your journey
            </Text>
          </MotiView>
        </LinearGradient>

        {/* Form card */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: "timing", duration: 500 }}
          style={styles.formCard}
        >
          <Input
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={errors.email}
            leftIcon={
              <Ionicons name="mail-outline" size={18} color={COLORS.textGray} />
            }
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            error={errors.password}
            leftIcon={
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={COLORS.textGray}
              />
            }
          />

          <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 20 }}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            size="lg"
            style={{ width: "100%", marginBottom: 16 }}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google sign in */}
          <Button
            title="Continue with Google"
            variant="outline"
            onPress={() => Alert.alert("Google Sign In", "Coming soon!")}
            size="lg"
            style={{ width: "100%", marginBottom: 24 }}
            icon={
              <Text style={{ fontSize: 16 }}>G</Text>
            }
          />

          {/* Register link */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logoMini: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoMiniText: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: "#fff",
  },
  brandName: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: "#fff",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "rgba(255,255,255,0.75)",
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    padding: 24,
    flex: 1,
    minHeight: 500,
  },
  forgotText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  registerText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  registerLink: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});
