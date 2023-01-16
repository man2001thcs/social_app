import React, { useState } from "react";
import { Pressable } from "react-native";
import { Text, Box, HStack, Spacer, IconButton, useToast } from "native-base";

import ToastAlert from "../../component/alert";

import { AntDesign } from "@expo/vector-icons";
import link from "../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function SearchSingle(props) {
  const toast = useToast();
  //console.log(props.user_id_2);
  const sendFunction = () => {
    fetch(
      link.server_link +
        "controller/search_history/edit.php?timeStamp=" +
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
              user_account_click: props.user_account_2,
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
    <Box my="1" mx="2" px="1" py="1" bgColor="white" rounded={"md"}>
      <Pressable onPress={() => props.setSearchBody(props.search_body)}>
        <HStack direction="row" space={8} px="2" alignItems={"center"}>
          <IconButton
            size="sm"
            variant="ghost"
            _icon={{
              as: AntDesign,
              name: "clockcircleo",
              color: "#137950",
              size: "md",
            }}
          />
          <Text bold>{props.search_body}</Text>

          <Spacer></Spacer>

          <IconButton
            mr="2"
            size="sm"
            variant="ghost"
            alignSelf="flex-end"
            _icon={{
              as: AntDesign,
              name: "delete",
              color: "#137950",
              size: "md",
            }}
          />
        </HStack>
      </Pressable>
    </Box>
  );
}

export default React.memo(SearchSingle);
