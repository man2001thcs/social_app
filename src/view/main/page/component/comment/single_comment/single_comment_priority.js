import React, { useState } from "react";
import { Stack } from "native-base";
import {
  Box,
  Button,
  HStack,
  VStack,
  Avatar,
  Text,
  Spacer,
  useToast,
} from "native-base";
import { Dimensions } from "react-native";

import Comment_like_button from "../like_function/comment_like_button";
import Time_show from "../time_function/time_show";
import link from "../../../../../../config/const";
import Image_show from "./img_show";
import Emotion_number from "./emotion_number";
import ToastAlert from "../../alert";
import GenerateRandomCode from "react-random-code-generator";
import Avatar_img from "./Avatar_img/Avatar_img";
import { useNavigation } from "@react-navigation/native";

//single comment format
function Single_Comment({ comment_id_prio, emailS, codeS }) {
  const dimensions = Dimensions.get("window");
  const navigation = useNavigation();

  const [like_click, setLike_click] = React.useState(false);
  const [comment_data, setCommentData] = React.useState([]);

  const fetchData = async () => {
    const getComment_link =
      link.comment_single_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    await fetch(getComment_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        comment_id: comment_id_prio,
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
          setCommentData(response_data);
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

  //the time that past by minute, since created,
  //divine by 5 so the comment can be updated for each 5 minute (if the variable is less than an hour)
  const time_distance_5 = Math.round(
    (new Date().valueOf() -
      new Date(comment_data?.Comment?.created.replace(/-/g, "/")).valueOf()) /
      300000
  );

  //the difference between the created and modified time
  const time_modified = Math.round(
    (new Date(comment_data?.Comment?.modified.replace(/-/g, "/")).valueOf() -
      new Date(comment_data?.Comment?.created.replace(/-/g, "/")).valueOf()) /
      60000
  );

  const author_avatar_link =
    link.user_image_link +
    comment_data?.Comment?.user_id +
    "/avatar/avatar_this.png";
  return (
    <Box ml="4" my="1.5" flex="1" key={comment_id_prio}>
      <HStack>
        <VStack>
          <Avatar_img
            user_name={comment_data?.Comment?.user_name}
            user_id={comment_data?.Comment?.user_id}
          />
        </VStack>
        <VStack>
          <Box
            bgColor="gray.200"
            width={dimensions.width - 100}
            rounded="xl"
            px="2"
            pt="1.5"
            pb="2"
          >
            <Stack>
              <Text bold pl="1">
                {comment_data?.Comment?.user_name}
              </Text>
            </Stack>

            <Stack>
              <Text pl="1">{comment_data?.Comment?.comment_body}</Text>
            </Stack>
          </Box>

          <HStack>
            <HStack space={0}>
              <Time_show
                time_distance_5={time_distance_5}
                time_modified={time_modified}
                color={"black.900"}
              />

              <Comment_like_button
                id={comment_id_prio}
                post_id={comment_data?.Comment?.post_id}
                emailS={emailS}
                codeS={codeS}
                setLike_click={setLike_click}
                like_click={like_click}
                author_id={comment_data?.Comment?.user_id}
                author_account={comment_data?.Comment?.user_account}
              />

              <Button
                variant="ghost"
                _text={{
                  color: "#137950",
                  fontSize: 13,
                }}
              >
                Phản hồi
              </Button>
              <Spacer></Spacer>
              {comment_data?.Comment?.user_id !== undefined && (
                <Emotion_number
                  emailS={emailS}
                  codeS={codeS}
                  comment_id={comment_id_prio}
                  user_id={comment_data?.Comment?.user_id}
                  navigation={navigation}
                  like_click={like_click}
                />
              )}
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <HStack ml="1/6">
        <Image_show
          id={comment_id_prio}
          img_num={parseInt(comment_data?.Comment?.img_num)}
          fullView={0}
          time_distance_5={time_distance_5}
          time_modified={time_modified}
        />
      </HStack>
    </Box>
  );
}

export default React.memo(Single_Comment);
