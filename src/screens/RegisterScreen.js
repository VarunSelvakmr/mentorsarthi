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
import { registerApi } from "../services/api";

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateForm = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password.trim()) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await registerApi({
        name: form.fullName,
        email: form.email,
        password: form.password,
      });
      Alert.alert("Success!", "Account created. Please verify your email.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    } catch (err) {
      Alert.alert("Registration Failed", err.message || "Please try again.");
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
        <LinearGradient
          colors={["#4C1D95", "#6B46C1"]}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <Text style={styles.headerTitle}>Create Account ✨</Text>
            <Text style={styles.headerSubtitle}>
              Join thousands of learners today
            </Text>
          </MotiView>
        </LinearGradient>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: "timing", duration: 500 }}
          style={styles.formCard}
        >
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(v) => updateForm("fullName", v)}
            placeholder="John Doe"
            autoCapitalize="words"
            error={errors.fullName}
            leftIcon={
              <Ionicons
                name="person-outline"
                size={18}
                color={COLORS.textGray}
              />
            }
          />
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(v) => updateForm("email", v)}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={errors.email}
            leftIcon={
              <Ionicons name="mail-outline" size={18} color={COLORS.textGray} />
            }
          />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(v) => updateForm("password", v)}
            placeholder="Min 6 characters"
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
          <Input
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(v) => updateForm("confirmPassword", v)}
            placeholder="Re-enter password"
            secureTextEntry
            error={errors.confirmPassword}
            leftIcon={
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={COLORS.textGray}
              />
            }
          />

          <Text style={styles.termsText}>
            By registering, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            size="lg"
            style={{ width: "100%", marginBottom: 16, marginTop: 8 }}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.screenBg },
  header: {
    paddingTop: 56,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  backBtn: {
    marginBottom: 20,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
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
  },
  termsText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    lineHeight: 18,
    marginBottom: 12,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});
