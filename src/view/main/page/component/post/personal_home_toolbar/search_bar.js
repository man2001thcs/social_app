import React from "react";

import { Button, IconButton, HStack, Avatar, Input, Icon } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";
import MaterialIcons from "@expo/vector-icons";

import link from "../../../../../../config/const.js";
import { useNavigation } from "@react-navigation/native";

export default function Search_bar({ emailS, codeS }) {
  const navigation = useNavigation();
  //console.log(user_avatar_link);
  return (
    <HStack>
      <Button
        variant="outline"
        w="100%"
        justifyContent="flex-start"
        rounded="full"
        _text={{
          textAlign: "left",
          color: "#137950",
          fontSize: 15,
        }}
        leftIcon={
          <Icon as={EvilIcons} name="search" size="md" color="#137950" />
        }
      >
        Tìm kiếm
      </Button>
    </HStack>
  );
}
