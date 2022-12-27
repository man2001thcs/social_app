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

import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slideshow from "react-native-image-slider-show";

import Image_show from "../img_function/img_show";
import Like_button from "./sub_component/emotion_button/like_button";
import Comment_share from "./sub_component/comment_share_number/comment_share";
import Menu_button from "./sub_component/menu_button/menu_button";
import Time_show from "./sub_component/time_show/time_show";
import link from "../../../../../../config/const";
import { Dimensions, StatusBar } from "react-native";

const SinglePost = ({ route_params }) => {
  //time difference since created
  const img_link = link.image_link + route_params.id + "/";
  const [img_arr, setImg_arr] = React.useState([]);
  const dimensions = Dimensions.get("window");
  const [position, setPosition] = React.useState(1);
  React.useEffect(() => {
    if (route_params.img_num >= 1) {
      var array = [];
      for (var i = 1; i <= route_params.img_num; i++) {
        array = [
          ...array,
          {
            title: "Title " + i,
            caption: "Caption " + i,
            url: img_link + i + ".png" + ".png",
          },
        ];
        setImg_arr(array);
      }
    }
  }, []);
  console.log(img_arr);

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

  return (
    <Box pb="2" px="1" pt="2" bgColor="gray.800">
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Box mb={dimensions.height * 1 / 8}>
          <Slideshow
            dataSource={img_arr}
            position={position}
            onPositionChanged={(position) => setPosition(position)}
            height={dimensions.height * 5 / 6}
            arrowSize={16}
          />
        </Box>
        <Box
          position="absolute"
          left="0"
          right="0"
          bottom="0"
          bgColor="black:alpha.50"
          zIndex={1}
        >
          <Flex direction="row" space={8} px="2" mt="2">
            <HStack>
              <VStack ml="2" mt="0.5">
                <HStack>
                  <Text bold fontSize="sm" color="white">
                    {route_params.author_name}
                  </Text>
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

          <Text mb="2" py="3" px="4" fontSize="18" color="white">
            {route_params.post_body}
          </Text>

          <HStack mx="2.5" py="2">
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
            space={9}
            justifyContent="center"
            pb="2"
            px="2"
            bgColor="black"
          >
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
                color: "white",
                fontSize: 15,
              }}
              endIcon={
                <Icon as={EvilIcons} name="comment" size="md" color="white" />
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
                color: "white",
                fontSize: 15,
              }}
              endIcon={
                <Icon as={FontAwesome} name="share" size="md" color="white" />
              }
            >
              Share
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default memo(SinglePost);
