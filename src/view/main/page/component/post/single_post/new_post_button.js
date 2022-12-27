import React from "react";
import {TouchableOpacity} from "react-native";
import { Button, IconButton, HStack, Avatar } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../../config/const.js";
import { useNavigation } from "@react-navigation/native";

function NewPost({ emailS, codeS, this_user_id }) {
  const navigation = useNavigation();
  const [info, setInfo] = React.useState("");

  //console.log(user_avatar_link);
  return (
    <HStack justifyContent="center" bgColor={"white"} py="3">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Personal_home", {
            user_id_click: this_user_id,
            user_account_click: emailS
          })
        }
      >
        <Avatar
          mr="3"
          bg="green.500"
          source={{
            uri:
              link.user_image_link +
              this_user_id +
              "/avatar/avatar_this.png?timeStamp=" +
              GenerateRandomCode.TextCode(8),
          }}
        ></Avatar>
      </TouchableOpacity>

      <Button
        mx="2"
        variant="outline"
        w="60%"
        _text={{
          color: "#137950",
        }}
        onPress={() => navigation.navigate("Create_post")}
      >
        Bạn đang nghĩ gì?
      </Button>
      <IconButton
        ml="3"
        size="md"
        variant="ghost"
        alignSelf="flex-end"
        _icon={{
          as: EvilIcons,
          name: "image",
          color: "#137950",
          size: "xl",
        }}
      />
    </HStack>
  );
}

export default React.memo(NewPost);
