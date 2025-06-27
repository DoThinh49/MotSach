import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import styles from "../../assets/styles/signup.styles";

export default function Sighnup() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>Signup Screen</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
