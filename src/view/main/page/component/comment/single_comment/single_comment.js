import React, { useState } from "react";
import { Stack } from "native-base";
import { Box, Button, HStack, VStack, Avatar, Text } from "native-base";
import { Dimensions } from "react-native";

import Comment_like_button from "../like_function/comment_like_button";
import Time_show from "../time_function/time_show";
import link from "../../../../../../config/const";

//single comment format
function Single_Comment({
  id,
  post_id,
  user_id,
  user_name,
  comment_body,
  created,
  modified,
  emailS,
  codeS,
  like_num,
  dislike_num,
  love_num,
  hate_num,
}) {
  const dimensions = Dimensions.get("window");

  //the time that past by minute, since created,
  //divine by 5 so the comment can be updated for each 5 minute (if the variable is less than an hour)
  const time_distance_5 = Math.round(
    (new Date().valueOf() - new Date(created.replace(/-/g, "/")).valueOf()) /
      300000
  );

  //the difference between the created and modified time
  const time_modified = Math.round(
    (new Date(modified.replace(/-/g, "/")).valueOf() -
      new Date(created.replace(/-/g, "/")).valueOf()) /
      60000
  );

  const author_avatar_link =
    link.user_image_link + user_id + "/avatar/avatar_this.png";
  return (
    <Box ml="4" my="1.5" flex="1">
      <HStack>
        <VStack>
          <Avatar
            mr="3"
            bg="green.500"
            size="md"
            source={{
              uri: author_avatar_link,
            }}
          >
            {user_name}
          </Avatar>
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
                {user_name}
              </Text>
            </Stack>

            <Stack>
              <Text pl="1">{comment_body}</Text>
            </Stack>
          </Box>

          <HStack px="2">
            <Button.Group isAttached>
              <Time_show
                time_distance_5={time_distance_5}
                time_modified={time_modified}
              />

              <Comment_like_button
                id={id}
                emailS={emailS}
                codeS={codeS}
                like_num={like_num}
                dislike_num={dislike_num}
                love_num={love_num}
                hate_num={hate_num}
              />

              <Button
                variant="ghost"
                _text={{
                  color: "#137950",
                  fontSize: 15,
                }}
              >
                Phản hồi
              </Button>
            </Button.Group>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

export default React.memo(Single_Comment);
