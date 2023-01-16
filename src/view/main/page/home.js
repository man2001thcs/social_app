import React from "react";
import { FlatList } from "react-native";
import { HStack, Box, Heading, Spinner } from "native-base";

import {
  Button,
  Actionsheet,
  useDisclose,
  Text,
  Center,
  NativeBaseProvider,
} from "native-base";

import GenerateRandomCode from "react-random-code-generator";
import { useFocusEffect } from "@react-navigation/native";

import SinglePost from "./component/post/single_post/single_post";
import New_post from "./component/post/single_post/new_post_button";
import link from "../../../config/const";
import Comment_modal from "./component/comment/comment_test";
import Share_post from "./component/post/single_post/sub_component/share_page/share_post";

function Home({ navigation, emailS, codeS, this_user_id }) {
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [post_list, setPostList] = React.useState([]);

  //const { isOpenShare, onOpenShare, onCloseShare } = useDisclose();
  //const [isOpenShare, setOpenShare] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showPostID, setShowPostID] = React.useState(0);
  const [showIndex, setShowIndex] = React.useState(0);
  const [share_post_id, setSharePost] = React.useState(0);

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
          //console.log(response_data);
          setPostList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setLoadMore(false);
  };

  //console.log(showPostID + showIndex);

  const refreshData = async () => {
    const getPost_link =
      link.post_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = { limit: 0, emailS: emailS, codeS: codeS, getMore: 0 };

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
        //console.log("Success:", data);

        if (parseInt(data?.id) === 0) {
          setCantLoadMore(true);
        } else if (parseInt(data?.id) === 1) {
          let response_data = JSON.parse(data?.data);
          //console.log(response_data);
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
        created={item?.Post.created}
        modified={item?.Post.modified}
        share_id={item?.Post.share_id}
        emailS={emailS}
        codeS={codeS}
        navigation={navigation}
        user_id={this_user_id}
        publicity_state={item?.Post.publicity_state}
        setShowIndex={setShowIndex}
        setShowPostID={setShowPostID}
        fullView={false}
        setSharePost={setSharePost}
        onOpen={onOpen}
        onClose={onClose}
      />
    );
  };

  const memoizedValue = React.useMemo(
    () => renderItem,
    [post_list]
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

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, []);
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, []);
  return (
    <Box flex="1" mt="0">
      <Share_post
        isOpenShare={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        emailS={emailS}
        codeS={codeS}
        this_user_id={this_user_id}
        share_post_id={share_post_id}
      />

      <HStack>
        <FlatList
          data={post_list}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.Post.id}
          ListHeaderComponent={() => {
            return (
              <New_post
                this_user_id={this_user_id}
                emailS={emailS}
                codeS={codeS}
              />
            );
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
