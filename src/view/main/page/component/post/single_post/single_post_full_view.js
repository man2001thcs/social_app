import React, { memo } from "react";

import {
  Text,
  Box,
  Button,
  HStack,
  Divider,
  Avatar,
  Flex,
  VStack,
  Spacer,
  Icon,
  ScrollView,
  useToast,
} from "native-base";

import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";

import Image_show from "../img_function/img_show";
import Like_button from "./sub_component/emotion_button/like_button";
import Comment_share from "./sub_component/comment_share_number/comment_share";
import Emotion_number from "./sub_component/emotion_number/emotion_number";
import Menu_button from "./sub_component/menu_button/menu_button";
import Time_show from "./sub_component/time_show/time_show";
import link from "../../../../../../config/const";
import Share_post_view from "./share_post_view";
import Post_body from "./sub_component/post_body/post_body";
import ToastAlert from "../../alert";

const SinglePost = ({ setSharePost, onOpen, this_user_id, onClose, route_params }) => {
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
        post_id: route_params.id,
        emailS: route_params.emailS,
        codeS: route_params.codeS,
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

  console.log("post_data: " + time_distance_5);

  const [like_click, setLike_click] = React.useState(false);

  const navigation = useNavigation();
  const author_avatar_link =
    link.user_image_link +
    parseInt(route_params.author_id) +
    "/avatar/avatar_this.png?timeStamp=" +
    GenerateRandomCode.TextCode(8);

  //console.log(route_params.created);
  return (
    <Box my="1" px="1" bgColor="white">
      <ScrollView>
        <Flex direction="row" space={8} px="2" mt="2">
          <HStack>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Personal_home", {
                  user_id_click: post_data?.Post?.user_id,
                  user_account_click: post_data?.Post?.user_account,
                })
              }
            >
              <Avatar
                bg="green.500"
                source={{
                  uri: author_avatar_link,
                }}
              >
                {post_data?.Post?.user_name}
              </Avatar>
            </TouchableOpacity>
            <VStack ml="2" mt="0.5">
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

          <Spacer />

          <Menu_button
            id={route_params.id}
            emailS={route_params.emailS}
            codeS={route_params.codeS}
            navigation={navigation}
            old_post_body={post_data?.Post?.post_body}
            user_id={route_params.user_id}
            author_id={post_data?.Post?.user_id}
            post_state={post_data?.Post?.publicity_state}
          />
        </Flex>

        <Post_body
          emailS={route_params.emailS}
          share_id={post_data?.Post?.share_id}
          author_account={post_data?.Post?.user_account}
          post_body={post_data?.Post?.post_body}
        />

        {parseInt(post_data?.Post?.share_id) > 0 && (
          <Share_post_view
            emailS={route_params.emailS}
            codeS={route_params.codeS}
            post_id={post_data?.Post?.share_id}
            user_id={this_user_id}
          />
        )}

        <Image_show
          img_num={parseInt(post_data?.Post?.img_num)}
          id={route_params.id}
          fullView={1}
          author_id={post_data?.Post?.user_id}
          author_account={post_data?.Post?.user_account}
          author_name={post_data?.Post?.user_name}
          post_body={post_data?.Post?.post_body}
          share_id={post_data?.Post?.share_id}
          created={post_data?.Post?.created}
          modified={post_data?.Post?.modified}
          comment_num={post_data?.Post?.comment_num}
          emailS={route_params.emailS}
          codeS={route_params.codeS}
        />

        <HStack ml="5" mt="1.5">
          <Emotion_number
            emailS={route_params.emailS}
            codeS={route_params.codeS}
            post_id={route_params.id}
            user_id={route_params.user_id}
            like_click={like_click}
            navigation={navigation}
          />
          <Spacer></Spacer>
          <Comment_share
            emailS={route_params.emailS}
            codeS={route_params.codeS}
            post_id={route_params.id}
            navigation={navigation}
          />
        </HStack>

        <HStack mx="2.5" my="2">
          <Divider
            thickness="2"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>

        <HStack
          space={parseInt(post_data?.Post?.share_id) > 0 ? 20 : 8}
          justifyContent="center"
          pb="2"
          px="2"
        >
          <Like_button
            id={route_params.id}
            author_id={post_data?.Post?.user_id}
            emailS={route_params.emailS}
            codeS={route_params.codeS}
            author_account={post_data?.Post?.user_account}
            setLike_click={setLike_click}
            like_click={like_click}
          />

          <Button
            variant="ghost"
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
            endIcon={
              <Icon as={EvilIcons} name="comment" size="md" color="#137950" />
            }
            onPress={() =>
              navigation.navigate("Comment_page", {
                id: route_params.id,
                author_id: post_data?.Post?.user_id,
                author_account: post_data?.Post?.user_account,
              })
            }
          >
            Comment
          </Button>
          {parseInt(post_data?.Post?.share_id) <= 0 && (
            <Button
              variant="ghost"
              _text={{
                color: "#137950",
                fontSize: 15,
              }}
              endIcon={
                <Icon as={FontAwesome} name="share" size="md" color="#137950" />
              }
              onPress={async () => {
                await setSharePost(route_params.id);
                onOpen();
              }}
            >
              Share
            </Button>
          )}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default memo(SinglePost);
