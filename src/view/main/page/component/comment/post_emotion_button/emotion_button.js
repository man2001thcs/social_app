import React from "react";
import { Button, Icon } from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

function Emotion_buttton({
  emotionState,
  setIsOpen,
  triggerProps,
  sendEmotion,
}) {
  if (emotionState === 1) {
    return (
      <Button
        variant="ghost"
        endIcon={<Icon as={AntDesign} name="like1" size="md" color="#137950" />}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(1, true);
        }}
      ></Button>
    );
  } else if (emotionState === 2) {
    return (
      <Button
        variant="ghost"
        endIcon={
          <Icon as={AntDesign} name="dislike1" size="md" color="blue.500" />
        }
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(2, true);
        }}
      ></Button>
    );
  } else if (emotionState === 3) {
    return (
      <Button
        variant="ghost"
        endIcon={<Icon as={AntDesign} name="heart" size="md" color="red.500" />}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(3, true);
        }}
      ></Button>
    );
  } else if (emotionState === 4) {
    return (
      <Button
        variant="ghost"
        endIcon={
          <Icon
            as={MaterialCommunityIcons}
            name="heart-broken"
            size="md"
            color="orange.500"
          />
        }
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(4, true);
        }}
      ></Button>
    );
  } else {
    return (
      <Button
        variant="ghost"
        endIcon={<Icon as={AntDesign} name="like2" size="md" color="#137950" />}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(1, false);
        }}
      ></Button>
    );
  }
}

export default React.memo(Emotion_buttton);
