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
import Time_show from "./time_function/time_show";
import ToastAlert from "../alert";

function FriendAccept(props) {
  const toast = useToast();
  const time_distance_5 = Math.round(
    (new Date().valueOf() -
      new Date(props.created.replace(/-/g, "/")).valueOf()) /
      300000
  );

  const time_modified = Math.round(
    (new Date(props.modified.replace(/-/g, "/")).valueOf() -
      new Date(props.created.replace(/-/g, "/")).valueOf()) /
      60000
  );

  const accept_declineFunction = (command) => {
    let command_line = (command === 1) ? "Kết bạn" : "Hủy kết bạn";
    fetch(
      link.server_link +
        "controller/friend/accept-decline.php?timeStamp=" +
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
          command: command,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
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
    <Box my="2.5" mx="2" px="1" pt="1" bgColor="white">
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
            <VStack>
              <HStack>
                <Time_show time_distance_5={time_distance_5} time_modified={time_modified}/>
              </HStack>
            </VStack>
          </Flex>
          <HStack>
            <Button variant="solid" mr="3" px="7" bgColor="#137950" onPress={() => accept_declineFunction(1)}>
              Chấp nhận
            </Button>
            <Button variant="solid" px="7" bgColor="#B5B6B0" onPress={() => accept_declineFunction(0)}>
              Xóa
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

export default React.memo(FriendAccept);
