import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import styles from "../../assets/styles/login.styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login, isCheckingAuth } = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password);

    if (!result.success) Alert.alert("Error", result.error);
  };

  if (isCheckingAuth) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* ILLUSTRATION*/}
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/b.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Vui lòng nhập email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputContainer}>
                {/*LEFT ICON*/}
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                {/*INPUT*/}
                <TextInput
                  style={styles.input}
                  placeholder="Vui lòng nhập mật khẩu"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>

            {/*FOOTER*/}
            <View style={styles.footer}>
              <Text style={styles.footerText}> Bạn chưa có tài khoản? </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Đăng ký</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
