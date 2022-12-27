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
  const mime = require("mime");
  const toast = useToast();
  const [imagesAvatar, setImageAvatar] = React.useState();
  const [imagesBackground, setImageBackground] = React.useState();

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
        setImageAvatar(result);
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
        aspect: [9, 16],
        quality: 1,
      });
      if (!result.canceled) {
        setImageBackground(result);
      }
    }
  };

  //handle single image
  function handleImageAvatar() {
    const newImageUri = "file:///" + images.uri.split("file:/").join("");

    const payload = new FormData();
    payload.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: "1.png",
    });

    fetch(
      link.server_link +
        "controller/user/save_img_avatar.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        body: payload,
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => res.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleImageBackground() {
    const newImageUri = "file:///" + images.uri.split("file:/").join("");

    const payload = new FormData();
    payload.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: "1.png",
    });

    fetch(
      link.server_link +
        "controller/user/save_img_background.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        body: payload,
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => res.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
