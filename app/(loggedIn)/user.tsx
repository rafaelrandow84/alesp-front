import { sanitizeName } from "@/helper/helper";
import { Button, ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import GravatarImage from "@/components/GravatarImage";
import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import { useSession } from "@/hooks/authContext";

export default function User() {
  const { userData, refreshUserData, signOut } = useSession();

  const [name, setName] = useState("-");
  const [email, setEmail] = useState("-");

  refreshUserData();

  useEffect(() => {
    setName(sanitizeName(userData?.name));
    setEmail(userData?.email);
  }, [userData]);

  return (
    <ThemeAwareBackground>
      <View style={{ padding: 8, gap: 8 }}>
        <ListItem>
          <GravatarImage email={email} imageSize={512} displaySize={72} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>{name}</ListItem.Title>
            <ListItem.Subtitle>{email}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title="Logout"
            onPress={() => {
              signOut();
            }}
          />
        </ListItem>
      </View>
    </ThemeAwareBackground>
  );
}
