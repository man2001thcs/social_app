import React from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Box,
  Button,
  Icon,
  Heading,
  Spacer,
  IconButton,
  ScrollView,
  VStack,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function Menu(props) {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  function FriendBar() {
    return (
      <VStack my="3">
        <HStack bgColor="white">
          <VStack>
            <Heading size="md" color="black" fontWeight="bold" ml="4" mt="2.5">
              Menu
            </Heading>
          </VStack>
          <Spacer></Spacer>
          <VStack alignSelf="flex-end">
            <Button.Group>
              <IconButton
                size="md"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: Ionicons,
                  name: "settings",
                  color: "#137950",
                  size: "xl",
                }}
              />
              <IconButton
                mr="3"
                size="md"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: Ionicons,
                  name: "search-sharp",
                  color: "#137950",
                  size: "xl",
                }}
              />
            </Button.Group>
          </VStack>
        </HStack>
        <VStack mx="2">
          <Divider
            thickness="2"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </VStack>
      </VStack>
    );
  }

  return (
    <Box flex="1" mt="0" bgColor="white">
      <ScrollView>
        {FriendBar()}
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={
              <Icon
                as={FontAwesome5}
                name="user-friends"
                size="md"
                color="#137950"
              />
            }
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
            onPress={() =>
              navigation.navigate("Personal_home", {
                user_id_click: props.this_user_id,
                user_account_click : props.emailS,
              })
            }
          >
            Trang cá nhân
          </Button>
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={
              <Icon
                as={FontAwesome5}
                name="user-friends"
                size="md"
                color="#137950"
              />
            }
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("Test")}
          >
            Test
          </Button>
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={
              <Icon
                as={FontAwesome5}
                name="user-friends"
                size="md"
                color="#137950"
              />
            }
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
          >
            Hỗ trợ
          </Button>
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={
              <Icon
                as={FontAwesome5}
                name="user-friends"
                size="md"
                color="#137950"
              />
            }
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
            onPress={() =>
              navigation.navigate("Setting", {
                user_id_click: props.this_user_id,
                user_account_click : props.emailS,
              })
            }
          >
            Cài đặt
          </Button>
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={8} pb="1" px="3">
          <Button
            variant="solid"
            h="10"
            w="100%"
            size="lg"
            bgColor="#137950"
            _text={{
              fontWeight: "bold",
            }}
          >
            Đăng xuất
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
}
