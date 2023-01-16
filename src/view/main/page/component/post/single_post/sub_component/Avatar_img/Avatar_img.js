import React from "react";
import { Avatar } from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import link from "../../../../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function Avatar_img({ user_id, user_name }) {
  const author_avatar_link =
    link.user_image_link +
    user_id +
    "/avatar/avatar_this.png?timeStamp=" +
    GenerateRandomCode.TextCode(8);
  console.log(author_avatar_link);
  if (user_id !== undefined) {
    return (
      <Avatar
        bg="green.500"
        source={{
          uri: author_avatar_link,
        }}
        size={"sm"}
      >
        {user_name}
      </Avatar>
    );
  }
}

export default React.memo(Avatar_img);
