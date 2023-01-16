import React from "react";
import { FlatList } from "native-base";
import {
  Icon,
  Box,
  Button,
  HStack,
  Flex,
  Spacer,
  VStack,
  Heading,
  Spinner,
  IconButton,
  Image,
} from "native-base";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as Yup from "yup";
import { Dimensions } from "react-native";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation } from "@react-navigation/native";

import link from "../../../../../config/const";
import Emo_already from "./like_function/emo_already";
import Create_comment from "./create_comment/create_comment";
import Single_comment from "./single_comment/single_comment";
import Like_button from "./post_emotion_button/like_button";
import Single_comment_priority from "./single_comment/single_comment_priority";

//comment main page
function Comment({ emailS, codeS, this_user_id, route_params }) {
  const dimensions = Dimensions.get("window");
  //number of comment showed
  const [showNumber, setShowNumber] = React.useState(0);
  const navigation = useNavigation();

  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);

  const [comment_list, setCommentList] = React.useState([]);
  const [post_emotion, setPostEmotion] = React.useState([]);

  const [like_click, setLike_click] = React.useState(false);

  //fetch comment data function
  const fetchData = async () => {
    const getComment_link =
      link.commment_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    //console.log(route_params);

    await fetch(getComment_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        post_id: route_params.id,
        limit: showNumber,
        emailS: emailS,
        codeS: codeS,
        getMore: 1,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success", data);

        if (parseInt(data?.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.id) === 1) {
          setShowNumber(showNumber + 5);
          let response_data = JSON.parse(data?.data);
          //console.log(response_data);
          setCommentList(response_data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchDataEmotion = async () => {
    await fetch(
      link.server_link +
        "controller/post/emotion/emotion_num.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          post_id: route_params.id,
          emailS: emailS,
          codeS: codeS,
          user_id: this_user_id,
        }),
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success emo", data);

        if (parseInt(data?.id) === 1) {
          setPostEmotion(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setLoadMore(false);
  };

  const refreshData = async () => {
    const getComment_link =
      link.commment_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = {
      limit: 5,
      emailS: emailS,
      codeS: codeS,
      getMore: 0,
      post_id: route_params.id,
    };

    await fetch(getComment_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success:", data);

        if (parseInt(data?.id) === 0) {
          setCantLoadMore(true);
        } else if (parseInt(data?.id) === 1) {
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setCommentList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setShowNumber(5);
    setCantLoadMore(false);
    setLoadMore(false);
    setRefresh(false);
  };

  //fetch data for first time only since render
  React.useEffect(() => {
    fetchData();
    fetchDataEmotion();
  }, []);

  React.useEffect(() => {
    fetchDataEmotion();
  }, [like_click]);

  //render function for flatlist
  const renderItem = ({ item, index }) => {
    if (
      item?.Comment.id !== null &&
      item !== undefined &&
      item?.Comment.id !== undefined &&
      parseInt(item?.Comment.id) !== parseInt(route_params.comment_id_prio)
    )
      return (
        <Single_comment
          key={item?.Comment.id}
          id={item?.Comment.id}
          post_id={item?.Comment.post_id}
          user_id={item?.Comment.user_id}
          user_account={item?.Comment.user_account}
          user_name={item?.Comment.user_name}
          comment_body={item?.Comment.comment_body}
          img_num={item?.Comment.img_num}
          created={item?.Comment.created}
          modified={item?.Comment.modified}
          rank={item?.Comment.rank}
          emailS={emailS}
          codeS={codeS}
          navigation={navigation}
          style={{ flex: 1 }}
        />
      );
  };

  //memolized list
  const memoizedList = React.useMemo(() => {
    return comment_list;
  }, [comment_list]);

  //memolized render value
  const memoizedValue = React.useMemo(
    () => renderItem,
    [showNumber, load_more]
  );

  //loading sreen
  const LoadingScreen = () => {
    return (
      <HStack space={2} justifyContent="center" py="4" bgcolor="white">
        <Spinner accessibilityLabel="Loading posts" color="green.600" />
        <Heading color="green.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  };

  //loading memo
  const memoLoadingScreen = React.useMemo(() => LoadingScreen, [comment_list]);

  const EmptyScreen = () => {
    return (
      <Box>
        <HStack
          space={2}
          justifyContent="center"
          justifyItems="center"
          py="4"
          bgcolor="white"
          mt="50"
        >
          <Image
            source={require("../../../../../img/no_comment.jpg")}
            alt="Alternate Text"
            size="xl"
          />
        </HStack>
        <HStack justifyContent="center">
          <Heading color="green.500" fontSize="xl">
            Chưa có bình luận
          </Heading>
        </HStack>
      </Box>
    );
  };

  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [comment_list]);

  const memoPrioComment = React.useMemo(() => {
    if (route_params?.comment_id_prio !== undefined) {
      return (
        <Single_comment_priority
          this_user_id={this_user_id}
          emailS={emailS}
          codeS={codeS}
          comment_id_prio={route_params?.comment_id_prio}
        />
      );
    }
  }, [route_params]);

  return (
    <Box mb="2.5" bgColor="white" borderRadius="xl" flex="1">
      <Flex
        direction="row"
        space={8}
        mr="0"
        mb="3"
        alignItems="center"
        my="2"
        mx="2"
      >
        <Emo_already
          user_appear={post_emotion?.user_appear ?? 0}
          like_num={post_emotion?.like_num ?? 0}
          dislike_num={post_emotion?.dislike_num ?? 0}
          love_num={post_emotion?.love_num ?? 0}
          hate_num={post_emotion?.hate_num ?? 0}
        />
        <Spacer></Spacer>
        <VStack>
          <Like_button
            emailS={emailS}
            codeS={codeS}
            id={route_params.id}
            author_id={route_params.author_id}
            author_account={route_params.author_account}
            setLike_click={setLike_click}
            like_click={like_click}
            post_id={route_params.id}
          />
        </VStack>
      </Flex>

      <HStack
        position="absolute"
        left="0"
        right="0"
        top="12"
        zIndex={2}
        h={dimensions.height * 0.8}
      >
        <FlatList
          style={{ flex: 1, height: dimensions.height * 0.77 }}
          data={memoizedList}
          ListHeaderComponent={memoPrioComment}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.Comment.id}
          onEndReachedThreshold={0.5}
          ListFooterComponent={!cant_load_more && memoLoadingScreen()}
          ListEmptyComponent={cant_load_more && memoEmptyScreen}
          onEndReached={() => {
            if (!cant_load_more) {
              setLoadMore(true);
              fetchData();
            }
          }}
        />
      </HStack>

      <HStack
        mt="3"
        mb="-3"
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        bgColor="white"
        zIndex={2}
      >
        <Create_comment
          emailS={emailS}
          codeS={codeS}
          post_id={route_params.id}
          refreshData={refreshData}
        />
      </HStack>
    </Box>
  );
}

export default React.memo(Comment);
