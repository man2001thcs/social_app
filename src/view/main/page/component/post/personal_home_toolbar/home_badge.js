import React from "react";

import {
  Button,
  IconButton,
  HStack,
  Avatar,
  Image,
  Box,
  Icon,
  Badge,
  Heading,
  Text,
} from "native-base";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";

import link from "../../../../../../config/const.js";
import { useNavigation } from "@react-navigation/native";

function Home_badge({ emailS, codeS, user_id, info, visit }) {
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");

  console.log(visit);

  return (
    <Box justifyContent="center" bgColor={"white"} py="2">
      <HStack height={(dimensions.width * 9) / 16} bgColor="green.200">
        <Image
          source={{
            uri:
              "http://192.168.1.153/php_social/img/user/" +
              user_id +
              "/background/background.jpg",
          }}
          alt="Alternate Text"
          style={{
            width: dimensions.width,
            height: (dimensions.width * 9) / 16,
          }}
        />
      </HStack>
      <HStack>
        <Avatar
          ml="3"
          mt={-dimensions.height / 8}
          bg="lightBlue.400"
          source={{
            uri:
              "http://192.168.1.153/php_social/img/user/" +
              user_id +
              "/avatar/avatar_this.png",
          }}
          size="2xl"
        >
          NB
          <Avatar.Badge>
            <IconButton
              variant="solid"
              bg="green.500"
              colorScheme="green"
              borderRadius="full"
              size={6}
              onPress={() =>
                navigation.navigate("AvatarSetting")
              }
              icon={
                <Icon
                  as={AntDesign}
                  size="4"
                  name="camera"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="warmGray.50"
                />
                
              }
            />
          </Avatar.Badge>
        </Avatar>
      </HStack>
      <HStack my="3">
        {!visit ? (
          <Button.Group
            isAttached
            direction="column"
            colorScheme="blue"
            mx={{
              base: "auto",
              md: 0,
            }}
            size="sm"
          >
            <Button w={dimensions.width - 20}>Thêm vào tin</Button>
            <Button variant="outline">Chỉnh sửa thông tin</Button>
          </Button.Group>
        ) : (
          <Button.Group
            isAttached
            direction="column"
            colorScheme="blue"
            mx={{
              base: "auto",
              md: 0,
            }}
            size="sm"
          >
            <Button w={dimensions.width - 20}>Thêm bạn</Button>
          </Button.Group>
        )}
      </HStack>

      <HStack my="3">
        <Box px="3">
          <HStack>
            <Heading fontSize="18">Chi tiết</Heading>
          </HStack>
          <HStack>
            <Icon as={AntDesign} name="home" size="md" color="black.700" />
            <Text fontSize="16" bold>
              {" "}
              Nơi ở: <Text italic>{info?.User?.address ?? ""}</Text>
            </Text>
          </HStack>
          <HStack>
            <Icon as={AntDesign} name="phone" size="md" color="black.700" />
            <Text fontSize="16" bold>
              {" "}
              Số điện thoại:{" "}
              <Text italic>{info?.User?.phone_number ?? ""}</Text>
            </Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default React.memo(Home_badge);
