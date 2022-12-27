import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Text,
  NativeBaseProvider,
  Box,
  Flex,
  Button,
  Icon,
  Heading,
  Spacer,
  IconButton,
} from "native-base";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import Home from "./page/home";
import FriendList from "./page/friend";
import NotifyList from "./page/notification";
import Menu from "./page/menu";
import { memo } from "react";

function Main({ emailS, codeS, this_user_id }) {

  const Tab = createMaterialTopTabNavigator();
  return (
    <Box flex="1" pt="2" bgColor="white" safeAreaTop>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Flex direction="row" space={8} mr="3" bgColor="white">
        <Heading size="md" color="#137950" fontWeight="bold" ml="4" mt="1">
          Social
        </Heading>

        <Spacer></Spacer>

        <IconButton
          colorScheme="indigo"
          borderRadius={50}
          mr="2"
          _icon={{
            as: AntDesign,
            name: "plus",
            color: "#137950",
          }}
          bgColor="#C6C7C0"
        />

        <IconButton
          colorScheme="indigo"
          borderRadius={50}
          bgColor="#C6C7C0"
          _icon={{
            as: AntDesign,
            name: "search1",
            color: "#137950",
          }}
        />
      </Flex>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarInactiveTintColor: "#949494",
          tabBarActiveTintColor: "#137950",
          showLabel: false,
          style: {
            size: "14",
          },
          tabBarIndicatorStyle: { backgroundColor: "green" },
        }}
      >
        <Tab.Screen
          name="Home"
          children={({ navigation }) => (
            <Home
              this_user_id={this_user_id}
              codeS={codeS}
              emailS={emailS}
              navigation={navigation}
            ></Home>
          )}
          options={{
            tabBarLabel: "Home",
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-home" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Friendlist"
          children={({ navigation }) => (
            <FriendList
              this_user_id={this_user_id}
              codeS={codeS}
              emailS={emailS}
              navigation={navigation}
            ></FriendList>
          )}
          options={{
            tabBarLabel: "",
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-friends" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="NotifyList"
          children={({ navigation }) => (
            <NotifyList
              this_user_id={this_user_id}
              codeS={codeS}
              emailS={emailS}
              navigation={navigation}
            ></NotifyList>
          )}
          options={{
            tabBarLabel: "",
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          children={(props) => (
            <Menu
              codeS={codeS}
              emailS={emailS}
              this_user_id={this_user_id}
              route_params={props.route.params}
            ></Menu>
          )}
          options={{
            tabBarLabel: "",
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="menu" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </Box>
  );
}
export default memo(Main);
