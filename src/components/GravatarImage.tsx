import { MD5 } from "@/helper/helper";
import { Avatar } from "@rneui/themed";
import { useEffect, useState } from "react";

type GravatarImageProps = {
  email: string;
  displaySize?: number;
  imageSize?: number;
};

export default function GravatarImage({ displaySize, imageSize, email }: GravatarImageProps) {
  const actualDisplaySize = displaySize || 128;
  const actualImageSize = imageSize || 64;

  const [uri, setUri] = useState<string>(`https://www.gravatar.com/avatar/void?s=${imageSize}&d=mp`);

  useEffect(() => {
    if (!email) return;
    const hash = MD5(email.toLowerCase().trim());
    setUri(`https://www.gravatar.com/avatar/${hash}?s=${imageSize}&d=retro`);
  }, [email]);

  return <Avatar rounded source={{ uri: uri }} size={actualDisplaySize} />;
}
