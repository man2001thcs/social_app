import React from "react";

import {
  Text,
  Box,
  Button,
  HStack,
  Avatar,
  Flex,
  VStack,
  useToast,
  Spacer,
} from "native-base";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../config/const";
import ToastAlert from "../alert";

function FriendSuggest(props) {
  const toast = useToast();

  //console.log(props.user_account_2);

  const sendFunction = (command) => {
    let command_line = (command === 1) ? "Gửi lời mời kết bạn" : "Gỡ";
    fetch(
      link.server_link +
        "controller/friend/send.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          emailS2: props.user_account_2, 
          emailS1: props.emailS,
          codeS: props.codeS,
          command: command
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success:", data);
        if (data?.code === "REQUEST_CREATE_OK") {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title= {command_line +" thành công"}
                  variant="solid"
                  description=""
                  isClosable={true}
                />
              );
            },
          });
          props.refreshData();
        } else {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title={command_line +" thất bại"}
                  variant="solid"
                  description="Vui lòng thử lại"
                  isClosable={true}
                />
              );
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.show({
          render: ({ id }) => {
            return (
              <ToastAlert
                id={id}
                title={command_line +" thất bại"}
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
    <Box my="1" mx="2" px="1" bgColor="white">
      <HStack direction="row" space={8} px="2" mt="3">
        <VStack>
          <Avatar
            bg="green.500"
            size="xl"
            source={{
              uri:
                link.user_image_link +
                props.user_id_2 +
                "/avatar/avatar_this.png?timeStamp=" +
                GenerateRandomCode.TextCode(8),
            }}
          >
            {props.user_name}
          </Avatar>
        </VStack>
        <VStack>
          <Flex direction="row" space="4" mb="2">
            <VStack>
              <HStack>
                <Text bold fontSize="lg">
                {props.user_name_2}
                </Text>
              </HStack>
              <HStack>
                <Text>53 bạn chung</Text>
              </HStack>
            </VStack>
            <Spacer w="5" />
          </Flex>
          <HStack>
            <Button variant="solid" mr="3" px="7" bgColor="#137950" onPress={() => sendFunction(1)}>
              Gửi kết bạn
            </Button>
            <Button variant="solid" mr="3" px="7" bgColor="red.600" onPress={() => sendFunction(2)}>
              Gỡ
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

export default React.memo(FriendSuggest);
