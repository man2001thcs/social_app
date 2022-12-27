import React from "react";
import { FlatList, Image, View } from "react-native";
import {
  HStack,
  Box,
  useToast,
  Text,
  Button,
  Icon,
  Switch,
  Flex,
  Heading,
  Spacer,
  IconButton,
} from "native-base";
import GenerateRandomCode from "react-random-code-generator";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import link from "../../../../../../config/const";
import * as ImagePicker from "expo-image-picker";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";
import ToastAlert from "../../alert";

function AvatarSetting({ emailS, codeS, this_user_id, route_params }) {
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");
  const mime = require("mime");
  const toast = useToast();

  const [imagesAvatar, setImageAvatar] = React.useState(
    route_params.result_avatar
  );
  const [newPostTick, setnewPostTick] = React.useState(true);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log(newPostTick);
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
        setImageAvatar(result);
      }
    }
  };

  //handle single image
  function handleImageAvatar() {
    //setIsSubmitting(true);

    const newImageUri = "file:///" + imagesAvatar.uri.split("file:/").join("");

    const payload = new FormData();

    payload.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: "1.png",
    });

    payload.append("emailS", emailS);
    payload.append("codeS", codeS);
    payload.append("user_id", this_user_id);
    payload.append("new_postTick", newPostTick);

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
      .then((res) => res.json())
      .then((data) => {
        if (
          data?.code === "AVATAR_CHANGE_OK" ||
          data?.code === "AVATAR_CHANGE_OK_NO_POST"
        ) {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title="Thay đổi Avatar"
                  variant="solid"
                  description="Thay đổi thành công"
                  isClosable={true}
                />
              );
            },
          });

          navigation.navigate("Personal_home", {
            user_id_click: this_user_id,
            user_account_click: emailS,
          });
        } else if (data?.code === "AVATAR_CHANGE_OK_FAILED_POST") {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title="Thay đổi Avatar"
                  variant="solid"
                  description="Tạo bài thất bại"
                  isClosable={true}
                />
              );
            },
          });
          navigation.navigate("Personal_home", {
            user_id_click: this_user_id,
            user_account_click: emailS,
          });
        } else {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title="Thay đổi Avatar"
                  variant="solid"
                  description="Thay đổi thất bại"
                  isClosable={true}
                />
              );
            },
          });
        }
      })
      .catch((error) => {
        toast.show({
          render: ({ id }) => {
            return (
              <ToastAlert
                id={id}
                title="Thay đổi Avatar"
                variant="solid"
                description={"Thay đổi thất bại. Lỗi: " + error + "."}
                isClosable={true}
              />
            );
          },
        });
      });
  }

  const WrappedSvg = () => (
    <View style={{ aspectRatio: 1 }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Circle r="50" cx="50" cy="50" fill="rgba(0, 0, 0)" />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#mask)"
          fill-opacity="0"
        />
      </Svg>
    </View>
  );

  return (
    <Box flex="1" mt="0" bgColor={"white"}>
      <Flex direction="row" space={8} mr="3" alignItems={"center"} pb={2}>
        <IconButton
          mt="2"
          variant="ghost"
          colorScheme="amber"
          icon={
            <Icon
              as={Ionicons}
              _dark={{
                color: "warmGray.50",
              }}
              size="7"
              name="arrow-back"
              color="#137950"
            />
          }
          onPress={() => navigation.goBack()}
        />

        <Heading size="md" mt="2">
          Chỉnh sửa avatar
        </Heading>

        <Spacer></Spacer>

        <Button
          size="md"
          variant="solid"
          alignSelf="flex-end"
          bgColor="#137950"
          onPress={() => handleImageAvatar()}
          isLoading={isSubmitting}
          isLoadingText="Đang tạo"
        >
          Đăng
        </Button>
      </Flex>

      <HStack justifyContent={"center"}>
        <View>
          <Image
            style={{
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: "black",
              width: dimensions.width,
              height: dimensions.width,
            }}
            source={{ uri: imagesAvatar?.uri }}
          />
        </View>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: 300,
            position: "absolute",
          }}
        >
          <WrappedSvg />
        </View>
      </HStack>
      <HStack alignItems={"center"} mt="2">
        <Button
          variant="ghost"
          h="10"
          startIcon={
            <Icon as={AntDesign} name="camera" size="xl" color="#137950" />
          }
          _text={{
            color: "black",
            fontSize: 14,
            fontWeight: "bold",
          }}
          onPress={() => pickImageAvatar()}
        >
          Lấy lại ảnh
        </Button>
      </HStack>
      <HStack alignItems={"center"}>
        <Switch
          colorScheme="primary"
          isChecked={newPostTick}
          onChange={() => setnewPostTick(!newPostTick)}
        />
        <Text bold> Chia sẻ lên bảng tin</Text>
      </HStack>
    </Box>
  );
}

export default React.memo(AvatarSetting);
