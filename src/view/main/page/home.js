import React from "react";
import { FlatList } from "react-native";
import { HStack, Box, Heading, Spinner } from "native-base";
import GenerateRandomCode from "react-random-code-generator";
import { useFocusEffect } from '@react-navigation/native';

import SinglePost from "./component/post/single_post/single_post";
import New_post from "./component/post/single_post/new_post_button";
import link from "../../../config/const";
import Comment_modal from "./component/comment/comment_test";

function Home({ navigation, emailS, codeS, this_user_id }) {
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [post_list, setPostList] = React.useState([]);

  const [showPostID, setShowPostID] = React.useState(0);
  const [showIndex, setShowIndex] = React.useState(0);

  const fetchData = async () => {
    const getPost_link =
      link.post_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    await fetch(getPost_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
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
          console.log(response_data);
          setPostList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setLoadMore(false);
  };

  console.log(showPostID + showIndex);

  const refreshData = async () => {
    const getPost_link =
      link.post_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = { limit: 5, emailS: emailS, codeS: codeS, getMore: 0 };

    await fetch(getPost_link, {
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
        console.log("Success:", data);

        if (parseInt(data?.id) === 0) {
          setCantLoadMore(true);
        } else if (parseInt(data?.id) === 1) {
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setPostList(response_data);
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

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [navigation])
  );

  const renderItem = ({ item }) => {
    return (
      <SinglePost
        id={item?.Post.id}
        author_id={item?.Post.user_id}
        author_account={item?.Post.user_account}
        author_name={item?.Post.user_name}
        post_body={item?.Post.post_body}
        img_num={item?.Post.img_num}
        like_num={item?.Post.like_num}
        dislike_num={item?.Post.dislike_num}
        love_num={item?.Post.love_num}
        hate_num={item?.Post.hate_num}
        created={item?.Post.created}
        modified={item?.Post.modified}
        share_id={item?.Post.share_id}
        //comment_num={item?.Comment}
        emailS={emailS}
        codeS={codeS}
        navigation={navigation}
        user_id={this_user_id}
        publicity_state={item?.Post.publicity_state}
        //
        setShowIndex={setShowIndex}
        setShowPostID={setShowPostID}
        fullView={false}
      />
    );
  };

  const memoizedList = React.useMemo(() => {
    return post_list;
  }, [post_list]);

  const memoizedValue = React.useMemo(
    () => renderItem,
    [showNumber, load_more]
  );

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

  const EmptyScreen = () => {
    return (
      <HStack space={2} justifyContent="center" py="4" bgcolor="white">
        <Spinner accessibilityLabel="Loading posts" color="green.600" />
        <Heading color="green.500" fontSize="md">
          Trống, vui lòng reload lại
        </Heading>
      </HStack>
    );
  };

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, [post_list]);
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [post_list]);
  return (
    <Box flex="1" mt="0">
      <HStack>
        <FlatList
          data={memoizedList}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.Post.id}
          ListHeaderComponent={() => {
            return <New_post this_user_id={this_user_id} emailS={emailS} codeS={codeS} />;
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={!cant_load_more && memoLoadingScreen()}
          ListEmptyComponent={cant_load_more && memoEmptyScreen}
          onEndReached={() => {
            if (!cant_load_more) {
              setLoadMore(true);
              fetchData();
            }
          }}
          refreshing={refresh_now}
          onRefresh={() => {
            setRefresh(true);
            refreshData();
          }}
        />
      </HStack>
    </Box>
  );
}

export default React.memo(Home);
