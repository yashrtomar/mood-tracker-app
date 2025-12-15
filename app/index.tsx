import { View } from "react-native";
import Today from "./Today";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Alright! Here we go....Moody app.</Text> */}
      <Today />
    </View>
  );
}
