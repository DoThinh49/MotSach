//mobile/app/_layout.jsx
import {
  Stack,
  useRouter,
  useSegments,
  useRootNavigationState,
} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const { checkAuth, user, token } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkAuth(); // nếu checkAuth là async
      setReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!navigationState?.key || !ready) return;

    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !isAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && isAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments, navigationState?.key, ready]);
  ////
  if (!navigationState?.key || !ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
