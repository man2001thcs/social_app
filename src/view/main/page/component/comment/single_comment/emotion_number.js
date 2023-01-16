import React from "react";
import link from "../../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useFocusEffect } from "@react-navigation/native";

import { Icon, HStack, Text, IconButton } from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";

function Emotion_number({
  emailS,
  codeS,
  comment_id,
  user_id,
  like_click,
  navigation,
}) {
  const [comment_emotion, setCommentEmotion] = React.useState([]);
  const [emo_sum, setEmosum] = React.useState(0);

  const fetchData = async () => {
    await fetch(
      link.server_link +
        "controller/comment/emotion/emotion_num.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          comment_id: comment_id,
          emailS: emailS,
          codeS: codeS,
          user_id: user_id,
        }),
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Success emo", data);
        if (parseInt(data?.id) === 1) {
          setCommentEmotion(data);
          setEmosum(
            parseInt(data?.like_num) +
              parseInt(data?.dislike_num) +
              parseInt(data?.love_num) +
              parseInt(data?.hate_num)
          );
        }
      })
      .catch((error) => {
        console.error("Error this 2:", error);
      });
  };

  //console.log("emo: " + emo_sum + like_click);

  React.useEffect(() => {
    fetchData();
  }, [like_click, comment_id]);

  const Context = () => {
    return <Text bold> {emo_sum >= 1 ? emo_sum : ""}</Text>;
  };

  return (
    <HStack alignItems="center">
      {parseInt(comment_emotion?.like_num ?? 0) > 0 && (
        <IconButton
          variant="solid"
          bg="green.500"
          colorScheme="green"
          borderRadius="full"
          size="6"
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
      {parseInt(comment_emotion?.dislike_num ?? 0) > 0 && (
        <IconButton
          variant="solid"
          bg="amber.400"
          colorScheme="amber"
          borderRadius="full"
          size="6"
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
      {parseInt(comment_emotion?.love_num ?? 0) > 0 && (
        <IconButton
          variant="solid"
          bg="red.500"
          colorScheme="red"
          borderRadius="full"
          size="6"
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
      {parseInt(comment_emotion?.hate_num ?? 0) > 0 && (
        <IconButton
          variant="solid"
          bg="violet.600"
          colorScheme="violet"
          borderRadius="full"
          size="6"
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
      <Context></Context>
    </HStack>
  );
}

export default React.memo(Emotion_number);
