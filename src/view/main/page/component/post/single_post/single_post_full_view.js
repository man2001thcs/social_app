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
} from "native-base";

import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";

import Image_show from "../img_function/img_show";
import Like_button from "./sub_component/emotion_button/like_button";
import Comment_share from "./sub_component/comment_share_number/comment_share";
import Menu_button from "./sub_component/menu_button/menu_button";
import Time_show from "./sub_component/time_show/time_show";
import link from "../../../../../../config/const";

const SinglePost = ({ route_params }) => {
  //time difference since created
  const time_distance_5 = Math.round(
    (new Date().valueOf() -
      new Date(route_params.created.replace(/-/g, "/")).valueOf()) /
      300000
  );

  const time_modified = Math.round(
    (new Date(route_params.modified.replace(/-/g, "/")).valueOf() -
      new Date(route_params.created.replace(/-/g, "/")).valueOf()) /
      60000
  );

  const navigation = useNavigation();
  const author_avatar_link =
    link.user_image_link + route_params.author_id + "/avatar/avatar_this.png";

  console.log(route_params.created);
  return (
    <Box my="1" px="1" bgColor="white">
      <ScrollView>
        <Flex direction="row" space={8} px="2" mt="2">
          <HStack>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Personal_home", {
                  user_id_click: route_params.author_id,
                })
              }
            >
              <Avatar
                bg="green.500"
                source={{
                  uri: author_avatar_link,
                }}
              >
                {route_params.author_name}
              </Avatar>
            </TouchableOpacity>
            <VStack ml="2" mt="0.5">
              <HStack>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Personal_home", {
                      user_id_click: route_params.author_id,
                    })
                  }
                >
                  <Text bold fontSize="sm">
                    {route_params.author_name}
                  </Text>
                </TouchableOpacity>
              </HStack>
              <HStack>
                <Time_show
                  time_distance={time_distance_5}
                  time_modified={time_modified}
                />
              </HStack>
            </VStack>
          </HStack>

          <Spacer />

          <Menu_button />
        </Flex>

        <Text mb="2" py="3" px="4" fontSize="18">
          {route_params.post_body}
        </Text>

        <Image_show
          img_num={parseInt(route_params.img_num)}
          id={route_params.id}
          fullView={1}
          author_id={route_params.author_id}
          author_account={route_params.author_account}
          author_name={route_params.author_name}
          post_body={route_params.post_body}
          like_num={route_params.like_num}
          dislike_num={route_params.dislike_num}
          love_num={route_params.love_num}
          hate_num={route_params.hate_num}
          created={route_params.created}
          modified={route_params.modified}
          comment_num={route_params.comment_num}
          emailS={route_params.emailS}
          codeS={route_params.codeS}
        />

        <Flex direction="row-reverse" px="1" mt="1.5">
          <Comment_share comment={route_params.comment_num} share={10} />
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

        <HStack space={9} justifyContent="center" pb="2" px="2">
          <Like_button
            id={route_params.id}
            author_id={route_params.author_id}
            emailS={route_params.emailS}
            codeS={route_params.codeS}
            like_num={route_params.like_num}
            dislike_num={route_params.dislike_num}
            love_num={route_params.love_num}
            hate_num={route_params.hate_num}
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
                like_num: route_params.like_num,
                dislike_num: route_params.dislike_num,
                love_num: route_params.love_num,
                hate_num: route_params.hate_num,
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
          >
            Share
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default memo(SinglePost);
