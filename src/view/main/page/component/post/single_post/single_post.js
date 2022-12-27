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
  Pressable,
} from "native-base";

import { TouchableOpacity } from "react-native";

import { FontAwesome, EvilIcons } from "@expo/vector-icons";

import Image_show from "../img_function/img_show";
import Like_button from "./sub_component/emotion_button/like_button";
import Comment_share from "./sub_component/comment_share_number/comment_share";
import Menu_button from "./sub_component/menu_button/menu_button";
import Time_show from "./sub_component/time_show/time_show";
import link from "../../../../../../config/const";
import AutoHeightImage from "react-native-auto-height-image";
import { Dimensions } from "react-native";
import GenerateRandomCode from "react-random-code-generator";

function SinglePost(props) {
  const dimensions = Dimensions.get("window");
  //time difference since created
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

  console.log(props.img_num);

  const author_avatar_link =
    link.user_image_link + props.author_id + "/avatar/avatar_this.png?timeStamp=" +  GenerateRandomCode.TextCode(8);

  return (
    <Box my="2" px="1" pt="2" bgColor="white">
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Single_post_full_view", {
            id: props.id,
            author_id: props.author_id,
            author_account: props.author_account,
            author_name: props.author_name,
            post_body: props.post_body,
            img_num: props.img_num,
            like_num: props.like_num,
            dislike_num: props.dislike_num,
            love_num: props.love_num,
            hate_num: props.hate_num,
            created: props.created,
            modified: props.modified,
            comment_num: props.comment_num,
            emailS: props.emailS,
            codeS: props.codeS,
            fullView: 1,
          })
        }
      >
        <Flex direction="row" space={8} px="2" mt="2">
          <HStack>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Personal_home", {
                  user_id_click: props.author_id,
                  user_account_click: props.author_account,
                })
              }
            >
              <Avatar
                bg="green.500"
                source={{
                  uri: author_avatar_link,
                }}
              >
                {props.author_name}
              </Avatar>
            </TouchableOpacity>
            <VStack ml="2" mt="0.5">
              <HStack>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Personal_home", {
                      user_id_click: props.author_id,
                      user_account_click: props.author_account,
                    })
                  }
                >
                  <Text bold fontSize="sm">
                    {props.author_name}
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
            id={props.id}
            emailS={props.emailS}
            codeS={props.codeS}
            navigation={props.navigation}
            old_post_body={props.post_body}
            user_id={props.user_id}
            author_id={props.author_id}
            post_state={props.publicity_state}
          />
        </Flex>

        <Text mb="2" py="3" px="4" fontSize="18">
          {props.post_body}
        </Text>

        <Image_show
          img_num={parseInt(props.img_num)}
          id={props.id}
          fullView={0}
          author_id={props.author_id}
          author_account={props.author_account}
          author_name={props.author_name}
          post_body={props.post_body}
          like_num={props.like_num}
          dislike_num={props.dislike_num}
          love_num={props.love_num}
          hate_num={props.hate_num}
          created={props.created}
          modified={props.modified}
          comment_num={props.comment_num}
          emailS={props.emailS}
          codeS={props.codeS}
          navigation={props.navigation}
        />

        <Flex direction="row-reverse" px="1" mt="1.5">
          <Comment_share
            emailS={props.emailS}
            codeS={props.codeS}
            post_id={props.id}
            navigation={props.navigation}
          />
        </Flex>

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

        <HStack space={8} justifyContent="center" pb="2" px="2">
          <Like_button
            id={props.id}
            author_id={props.author_id}
            emailS={props.emailS}
            codeS={props.codeS}
            like_num={props.like_num}
            dislike_num={props.dislike_num}
            love_num={props.love_num}
            hate_num={props.hate_num}
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
              props.navigation.navigate("Comment_page", {
                id: props.id,
                author_id: props.author_id,
                like_num: props.like_num,
                dislike_num: props.dislike_num,
                love_num: props.love_num,
                hate_num: props.hate_num,
              })
            }
          >
            Comment
          </Button>
          <Button
            variant="ghost"
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
            endIcon={
              <Icon as={FontAwesome} name="share" size="md" color="#137950" />
            }
            onPress={() =>
              props.navigation.navigate("Share_post", {
                id: props.id,
              })
            }
          >
            Share
          </Button>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}

export default memo(SinglePost);
