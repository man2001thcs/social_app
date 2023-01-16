import React, { memo } from "react";

import { Text, Box, HStack, Flex, VStack, useToast } from "native-base";

import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import GenerateRandomCode from "react-random-code-generator";

import Image_show from "../img_function/img_show";
import Time_show from "./sub_component/time_show/time_show";
import link from "../../../../../../config/const";
import ToastAlert from "../../alert";
import Avatar_img from "./sub_component/Avatar_img/Avatar_img";
import Post_body from "./sub_component/post_body/post_body";

const SinglePost = ({ emailS, codeS, post_id, user_id }) => {
  const [post_data, setPostData] = React.useState([]);
  const toast = useToast();
  const fetchData = async () => {
    const getPost_link =
      link.post_single_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    await fetch(getPost_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        post_id: post_id,
        emailS: emailS,
        codeS: codeS,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success", data);
        if (parseInt(data?.id) === 1) {
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setPostData(response_data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.show({
          render: ({ id }) => {
            return (
              <ToastAlert
                id={id}
                title="Lấy dữ liệu thất bại"
                variant="solid"
                description={"Lỗi: " + error}
                isClosable={true}
              />
            );
          },
        });
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  //time difference since created
  const time_distance_5 = Math.round(
    (new Date().valueOf() -
      new Date(post_data?.Post?.created.replace(/-/g, "/")).valueOf()) /
      300000
  );

  const time_modified = Math.round(
    (new Date(post_data?.Post?.modified.replace(/-/g, "/")).valueOf() -
      new Date(post_data?.Post?.created.replace(/-/g, "/")).valueOf()) /
      60000
  );

  const navigation = useNavigation();

  //console.log(route_params.created);
  return (
    <Box
      my="1"
      px="1"
      py="2"
      mx="0.5"
      bgColor="white"
      borderColor={"gray.300"}
      borderWidth="1.5"
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Single_post_full_view", {
            id: post_id,
            author_id: post_data?.Post?.user_id,
            user_id: user_id,
            emailS: emailS,
            codeS: codeS,
            fullView: 1,
          })
        }
      >
        <Flex direction="row" space={8} px="3" mt="2">
          <HStack>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Personal_home", {
                  user_id_click: post_data?.Post?.user_id,
                  user_account_click: post_data?.Post?.user_account,
                })
              }
            >
              {post_data?.Post?.user_id !== undefined && (
                <Avatar_img
                  user_name={post_data?.Post?.user_name}
                  user_id={post_data?.Post?.user_id}
                />
              )}
            </TouchableOpacity>
            <VStack ml="2" mt="-1">
              <HStack>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Personal_home", {
                      user_id_click: post_data?.Post?.user_id,
                      user_account_click: post_data?.Post?.user_account,
                    })
                  }
                >
                  <Text bold fontSize="sm">
                    {post_data?.Post?.user_name}
                  </Text>
                </TouchableOpacity>
              </HStack>
              <HStack>
                <Time_show
                  time_distance_5={time_distance_5}
                  time_modified={time_modified}
                />
              </HStack>
            </VStack>
          </HStack>
        </Flex>

        <Post_body
          emailS={emailS}
          share_id={post_data?.Post?.share_id}
          author_account={post_data?.Post?.user_account}
          post_body={post_data?.Post?.post_body}
        />

        <Image_show
          img_num={parseInt(post_data?.Post?.img_num)}
          id={post_id}
          fullView={0}
          author_id={post_data?.Post?.user_id}
          author_account={post_data?.Post?.user_account}
          author_name={post_data?.Post?.user_name}
          post_body={post_data?.Post?.post_body}
          share_id={post_data?.Post?.share_id}
          created={post_data?.Post?.created}
          modified={post_data?.Post?.modified}
          comment_num={post_data?.Post?.comment_num}
          emailS={emailS}
          codeS={codeS}
          width_minus={10}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default memo(SinglePost);
