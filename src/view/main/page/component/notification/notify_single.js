import React, { useState } from "react";

import {
  Text,
  Box,
  HStack,
  Avatar,
  IconButton,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Context from "./context";
import Time_show from "./time_show";
import ToastAlert from "../../component/alert";

import { Ionicons } from "@expo/vector-icons";
import link from "../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function NotifySingle(props) {
  const toast = useToast();
  console.log(props.user_id_2);
  const sendFunction = () => {
    fetch(
      link.server_link +
        "controller/notification/edit.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          emailS: props.emailS,
          codeS: props.codeS,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        if (data?.code === "NOTIFY_EDIT_OK") {
          if (parseInt(props.type) === 3) {
            props.navigation.navigate("Personal_home", {
              user_id_click: props.user_id_2,
              user_account_click: props.user_account_2
            });
          }
          //props.refreshData();
        } else {
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.show({
          render: ({ id }) => {
            return (
              <ToastAlert
                id={id}
                title={"Thất bại"}
                variant="solid"
                description={"Error: " + error + ". Vui lòng thử lại."}
                isClosable={true}
              />
            );
          },
        });
      });
  };

  return (
    <Box
      my="1.5"
      mx="2"
      px="1"
      py="3"
      bgColor={parseInt(props.showed) !== 1 ? "green.100" : "white"}
      flex="1"
      rounded="md"
    >
      <TouchableOpacity
        onPress={() => {
          sendFunction();
        }}
      >
        <HStack direction="row" space={4} px="3">
          <VStack>
            <Avatar
              bg="green.500"
              size="lg"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            >
              {props.user_name_2}
            </Avatar>
          </VStack>

          <VStack flex="1" justifyContent="center">
            <HStack>
              <Text fontSize="md">
                <Text bold>{props.user_name_2} </Text>
                <Context type={parseInt(props.type)} />{" "}
                <Text bold>{props.user_name_1} </Text>
              </Text>
            </HStack>
            <HStack>
              <Time_show created={props.created} />
            </HStack>
          </VStack>

          <VStack>
            <IconButton
              size="md"
              mt="0"
              variant="ghost"
              alignSelf="flex-end"
              _icon={{
                as: Ionicons,
                name: "ellipsis-horizontal",
                color: "#137950",
              }}
            />
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}

export default React.memo(NotifySingle);
