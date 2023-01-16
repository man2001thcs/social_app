import React from "react";
import { Text } from "native-base";
import link from "../../../../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useFocusEffect } from "@react-navigation/native";

function Comment_Share({ emailS, codeS, post_id, navigation }) {
  const [comment_num, setCommentNum] = React.useState(0);
  const [share_num, setShareNum] = React.useState(0);
  const fetchData = async () => {
    const getComment_link =
      link.commment_share_num_link +
      "?timeStamp=" +
      GenerateRandomCode.TextCode(8);

    //console.log(route_params);

    await fetch(getComment_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        post_id: post_id,
        emailS: emailS,
        codeS: codeS,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success", data);
        if (parseInt(data?.id) === 1) {
          setCommentNum(parseInt(data?.comment_num));
          setShareNum(parseInt(data?.share_num));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [navigation])
  );

  return (
    <Text
      variant="ghost"
      px="5"
      mb="2"
      mt="2"
      fontSize="15"
      _text={{
        color: "coolGray.800",
      }}
    >
      {comment_num > 0 ? (
        <Text> {comment_num} bình luận </Text>
      ) : (
        <Text> Chưa có bình luận </Text>
      )}
      {share_num > 0 && <Text> | {share_num} lượt chia sẻ</Text>}
    </Text>
  );
}

export default React.memo(Comment_Share);
