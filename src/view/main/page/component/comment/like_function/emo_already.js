import React from "react";
import {Icon, HStack, Text, IconButton } from "native-base";
import {
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

//Show emotion list of the post that people has already interacted
function Emotion_already({ like_num, dislike_num, love_num, hate_num }) {
  //total of people that interact with post
  const emo_sum =
    parseInt(like_num) +
    parseInt(dislike_num) +
    parseInt(love_num) +
    parseInt(hate_num);
  //console.log(parseInt(hate_num));
  return (
    <HStack alignItems="center">
      {parseInt(like_num) > 0 && (
        <IconButton
          variant="solid"
          bg="green.500"
          colorScheme="green"
          borderRadius="full"
          size="sm"
          icon={
            <Icon
              as={AntDesign}
              name="like1"
              _dark={{
                color: "warmGray.50",
              }}
              color="warmGray.50"
            />
          }
        />
      )}
      {parseInt(dislike_num) > 0 && (
        <IconButton
          variant="solid"
          bg="amber.400"
          colorScheme="amber"
          borderRadius="full"
          size="sm"
          icon={
            <Icon
              as={AntDesign}
              _dark={{
                color: "warmGray.50",
              }}
              name="dislike1"
              color="warmGray.50"
            />
          }
        />
      )}
      {parseInt(love_num) > 0 && (
        <IconButton
          variant="solid"
          bg="red.500"
          colorScheme="red"
          borderRadius="full"
          size="sm"
          icon={
            <Icon
              as={AntDesign}
              _dark={{
                color: "warmGray.50",
              }}
              name="heart"
              color="warmGray.50"
            />
          }
        />
      )}
      {parseInt(hate_num) > 0 && (
        <IconButton
          variant="solid"
          bg="violet.600"
          colorScheme="violet"
          borderRadius="full"
          size="sm"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="heart-broken"
              _dark={{
                color: "warmGray.50",
              }}
              color="warmGray.50"
            />
          }
        />
      )}
      <Text bold> {emo_sum}</Text>
      {emo_sum >= 0 && (
        <IconButton
          variant="ghost"
          borderRadius="full"
          size="sm"
          colorScheme="green"
          _icon={{
            as: AntDesign,
            name: "right",
          }}
        />
      )}
    </HStack>
  );
}

export default React.memo(Emotion_already);
