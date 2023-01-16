import React from "react";
import { FlatList } from "react-native";
import {
  HStack,
  Box,
  Heading,
  useToast,
  Text,
  Button,
  Icon,
} from "native-base";
import GenerateRandomCode from "react-random-code-generator";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";

import link from "../../../../../config/const";

function AvatarSetting({ emailS, codeS, this_user_id }) {
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");

  //pick image function, call from button
  const pickImageAvatar = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted == false) {
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.canceled) {
        navigation.navigate("AvatarEdit", {
          result_avatar: result,
        })
      }
    }
  };

  const pickImageBackground = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted == false) {
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.canceled) {
        navigation.navigate("BackgroundEdit", {
          result_background: result,
        })
      }
    }
  };

  return (
    <Box flex="1" mt="0" bgColor={"white"}>
      <HStack ml="4">
        <Heading fontSize={20}>Tài khoản</Heading>
      </HStack>
      <HStack ml="4">
        <Text>Cập nhật hình ảnh nền</Text>
      </HStack>
      <HStack ml="4">
        <Button
          variant="ghost"
          h="10"
          startIcon={
            <Icon
              as={FontAwesome}
              name="user-circle-o"
              size="md"
              color="#5E5E5E"
            />
          }
          _text={{
            color: "#5E5E5E",
            fontSize: 18,
            fontWeight: "bold",
          }}
          onPress={() => pickImageAvatar()}
        >
          Cập nhật hình đại diện
        </Button>
      </HStack>
      <HStack ml="4">
        <Button
          variant="ghost"
          h="10"
          startIcon={
            <Icon as={Entypo} name="image" size="md" color="#5E5E5E" />
          }
          _text={{
            color: "#5E5E5E",
            fontSize: 18,
            fontWeight: "bold",
          }}
          onPress={() => pickImageBackground()}
        >
          Cập nhật background
        </Button>
      </HStack>
    </Box>
  );
}

export default React.memo(AvatarSetting);
