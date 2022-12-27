import React from "react";

import {
  Button,
  IconButton,
  HStack,
  Avatar,
  Input,
  Icon,
  Text,
  Heading

} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";
import MaterialIcons from "@expo/vector-icons";
import link from "../../../../../config/const.js";
import { useNavigation } from "@react-navigation/native";

export default function Top_bar({ title }) {
  const navigation = useNavigation();
  //console.log(user_avatar_link);
  return (
    <HStack ml="-2">
      <Heading fontSize={20}>{title}</Heading>
    </HStack>
  );
}
