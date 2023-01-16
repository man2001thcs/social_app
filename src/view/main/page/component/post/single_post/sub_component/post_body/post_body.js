import React from "react";
import { Text } from "native-base";


const Text_body = (props) => {
  if (parseInt(props.share_id) === -1 && props.author_account === props.emailS) {
    return (
      <Text mb="2" py="3" px="4" fontSize="18">
        {"Bạn vừa cập nhật ảnh đại diện"}
      </Text>
    );
  } else if (parseInt(props.share_id) === -2 && props.author_account === props.emailS) {
    return (
      <Text mb="2" py="3" px="4" fontSize="18">
        {"Bạn vừa cập nhật ảnh nền của mình"}
      </Text>
    );
  } else {
    return (
      <Text mb="2" py="3" px="4" fontSize="18">
        {props.post_body}
      </Text>
    );
  }
};

export default React.memo(Text_body);
