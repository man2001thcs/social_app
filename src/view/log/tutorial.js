import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  extendTheme,
} from "react-native";
import {
  NativeBaseProvider,
  Text,
  Box,
  Button,
  HStack,
  Divider,
  Center,
  Avatar,
  Flex,
  IconButton,
  VStack,
  Spacer,
  Icon,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Tutorial({ navigation }) {
  return (
    <NativeBaseProvider>
      <Box my="2.5" mx="4" px="1" pt="2" bgColor="white">
        <Flex direction="row" space={8} px="3" mt="3">
          <Avatar
            bg="green.500"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            AJ
          </Avatar>

          <Spacer></Spacer>

          <IconButton
            size="md"
            variant="ghost"
            alignSelf="flex-end"         
            _icon={{
              as: MaterialIcons,
              name: "menu",
              color: "#137950",
            }}
          />
        </Flex>
        <Text mb="2" py="3" px="3">
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.{"\n"}
          Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Text>
        <Divider
          my="3"
          thickness="2"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <Flex direction="row-reverse" space={8} px="3" mt="1">
          <Text
            variant="ghost"
            px="5"
            mb="2"
            _text={{
              color: "coolGray.800",
            }}
          >
            17 bình luận
          </Text>
        </Flex>
        <HStack space={8} justifyContent="center" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            w="20"
            _text={{
              color: "#137950",
            }}
            endIcon={<Icon as={EvilIcons} name="like" size="md" color="#137950" />}
          >
            Like
          </Button>
          <Button
            variant="ghost"
            h="10"
            _text={{
              color: "#137950",
            }}
            endIcon={<Icon as={EvilIcons} name="comment" size="md" color="#137950"/>}
          >
            Comment
          </Button>
          <Button
            variant="ghost"
            h="10"
            w="20"
            _text={{
              color: "#137950",
            }}
            endIcon={<Icon as={FontAwesome} name="share" size="md" color="#137950" />}
          >
            Share
          </Button>
        </HStack>       
      </Box>
    </NativeBaseProvider>
  );
}
