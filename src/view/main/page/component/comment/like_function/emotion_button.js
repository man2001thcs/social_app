import React from "react";
import { Button} from "native-base";

//The emotion button below the comment
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
        _text={{
          color: "#137950",
          fontSize: 15,
          fontWeight: 'bold',
        }}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(1, true);
        }}
      >
        Thích
      </Button>
    );
  } else if (emotionState === 2) {
    return (
      <Button
        variant="ghost"
        _text={{
          color: "blue.500",
          fontSize: 15,
          fontWeight: 'bold',
        }}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(2, true);
        }}
      >
        Không thích
      </Button>
    );
  } else if (emotionState === 3) {
    return (
      <Button
        variant="ghost"
        _text={{
          color: "red.500",
          fontSize: 15,
          fontWeight: 'bold',
        }}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(3, true);
        }}
      >
        Yêu thích
      </Button>
    );
  } else if (emotionState === 4) {
    return (
      <Button
        variant="ghost"
        _text={{
          color: "orange.500",
          fontSize: 15,
          fontWeight: 'bold',
        }}       
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(4, true);
        }}
      >
        Angry
      </Button>
    );
  } else {
    return (
      <Button
        variant="ghost"
        _text={{
          color: "gray.700",
          fontSize: 15,
          fontWeight: 'bold',
        }}
        onLongPress={() => setIsOpen(true)}
        {...triggerProps}
        onPress={() => {
          sendEmotion(1, false);
        }}
      >
        Like
      </Button>
    );
  }
}

export default React.memo(Emotion_buttton);
