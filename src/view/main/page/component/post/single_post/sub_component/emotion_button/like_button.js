import React, { useState } from "react";
import {
  Popover,
  Stagger,
  IconButton,
  Icon,
  HStack,
} from "native-base";
import {
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../../../../config/const";
import Emotion_button from "./emotion_button";

function Like_button({
  id,
  author_id,
  emailS,
  codeS,
  like_num,
  dislike_num,
  love_num,
  hate_num,
}) {
  const [emotionState, setEmotionState] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    fetch(
      link.emotion_list_link + "?timeStamp=" + GenerateRandomCode.TextCode(8),
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: id,
          emailS: emailS,
          codeS: codeS,
        }),
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Success", data);
        if (parseInt(data?.response.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.response.id) === 1) {
          let response_data = JSON.parse(data?.response.answer);
          console.log(response_data);
          setEmotionState(parseInt(response_data));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [like_num, dislike_num, love_num, hate_num]);

  //console.log("emo: " + emotionState);

  const sendEmotion = async (emoState, cancel) => {
    const getPost_link =
      link.emotion_send_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    await fetch(getPost_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        author_id: author_id,
        emotionState: emoState,
        oldEmotionState: emotionState,
        emailS: emailS,
        codeS: codeS,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("Success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (cancel) {
      setEmotionState(0);
    } else {
      if (emoState === emotionState) {
        setEmotionState(0);
      } else {
        setEmotionState(emoState);
      }
    }
  };

  return (
    <Popover // @ts-ignore
      placement="top"
      trigger={(triggerProps) => {
        return (
          <Emotion_button
            emailS={emailS}
            codeS={codeS}
            emotionState={emotionState}
            setIsOpen={setIsOpen}
            triggerProps={triggerProps}
            sendEmotion={sendEmotion}
          />
        );
      }}
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Popover.Content w="56" rounded="xl">
        <Popover.Body>
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 20,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 20,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <HStack justifyContent="center" space="2">
              <IconButton
                variant="solid"
                bg="green.500"
                colorScheme="green"
                borderRadius="full"
                icon={
                  <Icon
                    as={AntDesign}
                    size="md"
                    name="like1"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
                onPress={() => sendEmotion(1, false)}
              />
              <IconButton
                variant="solid"
                bg="amber.400"
                colorScheme="amber"
                borderRadius="full"
                icon={
                  <Icon
                    as={AntDesign}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="md"
                    name="dislike1"
                    color="warmGray.50"
                  />
                }
                onPress={() => sendEmotion(2, false)}
              />
              <IconButton
                variant="solid"
                bg="red.500"
                colorScheme="red"
                borderRadius="full"
                icon={
                  <Icon
                    as={AntDesign}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="md"
                    name="heart"
                    color="warmGray.50"
                  />
                }
                onPress={() => sendEmotion(3, false)}
              />
              <IconButton
                variant="solid"
                bg="violet.600"
                colorScheme="violet"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    size="6"
                    name="heart-broken"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
                onPress={() => sendEmotion(4, false)}
              />
            </HStack>
          </Stagger>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default React.memo(Like_button);
