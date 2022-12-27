import React from "react";
import { FlatList } from "react-native";
import {
  HStack,
  Box,
  Heading,
  Spinner,
  Center,
  Text,
  Button,
  Icon,
} from "native-base";
import GenerateRandomCode from "react-random-code-generator";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";

function Setting() {
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");

  return (
    <Box flex="1" mt="0" bgColor={"white"}>
      <HStack ml="4">
        <Heading fontSize={20}>Tài khoản</Heading>
      </HStack>
      <HStack ml="4">
        <Text>Cập nhật thông tin để bảo vệ tài khoản</Text>
      </HStack>
      <HStack ml="4">
        <Button
          variant="ghost"
          h="10"
          startIcon={
            <Icon as={AntDesign} name="user" size="md" color="#5E5E5E" />
          }
          _text={{
            color: "#5E5E5E",
            fontSize: 18,
            fontWeight: "bold",
          }}
          onPress={() => navigation.navigate("Information")}
        >
          Thông tin cá nhân
        </Button>
      </HStack>
      <HStack ml="4">
        <Button
          variant="ghost"
          h="10"
          startIcon={
            <Icon as={AntDesign} name="key" size="md" color="#5E5E5E" />
          }
          _text={{
            color: "#5E5E5E",
            fontSize: 18,
            fontWeight: "bold",
          }}
          onPress={() => navigation.navigate("EditPassword")}
        >
          Mật khẩu
        </Button>
      </HStack>
    </Box>
  );
}

export default React.memo(Setting);
