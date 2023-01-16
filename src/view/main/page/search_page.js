import React from "react";
import { FlatList } from "react-native";
import {
  HStack,
  Box,
  Spinner,
  VStack,
  Spacer,
  Divider,
  Heading,
  Button,
  IconButton,
  Text,
  Input,
  useDisclose,
} from "native-base";

import { useFocusEffect } from "@react-navigation/native";

import SuggestSearch from "./component/friend/friend_suggest_single_search";
import SinglePost from "./component/post/single_post/single_post";
import link from "../../../config/const";
import FriendSuggestList from "./component/friend/friend_suggest";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";

import Search_history_single from "./component/search/search_history_single";
import Share_post from "./component/post/single_post/sub_component/share_page/share_post";
import Friend_suggest_single from "./component/friend/friend_suggest_single_search";

export default function FriendList({ emailS, codeS, this_user_id }) {
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [list, setList] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const [search_body, setSearchBody] = React.useState("");
  const [commandLine, setCommandLine] = React.useState(0);
  const [commandClick, setCommandLineClick] = React.useState(1);

  const { isOpen, onOpen, onClose } = useDisclose();
  const [showPostID, setShowPostID] = React.useState(0);
  const [showIndex, setShowIndex] = React.useState(0);
  const [share_post_id, setSharePost] = React.useState(0);

  const navigation = useNavigation();

  console.log("commandLine: " + commandLine);

  const fetchData = async (commandLine, commandClick) => {
    let get_link =
      link.search_history_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    if (commandLine === 1) {
      get_link =
        link.post_search_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    } else if (commandLine === 2) {
      get_link =
        link.friend_search_suggest_link +
        "?timeStamp=" +
        GenerateRandomCode.TextCode(8);
    }
    console.log(get_link);
    await fetch(get_link, {
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
        user_id: this_user_id,
        search_body: search_body,
        type: commandClick,
        getMore: 1,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success", data);
        if (parseInt(data?.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.id) === 1) {
          setShowNumber(showNumber + 5);
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setLoading(false);
    setLoadMore(false);
  };

  const refreshData = async (commandLine, commandClick) => {
    let get_link =
      link.search_history_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    if (commandLine === 1) {
      get_link =
        link.post_search_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    } else if (commandLine === 2) {
      get_link =
        link.friend_search_suggest_link +
        "?timeStamp=" +
        GenerateRandomCode.TextCode(8);
    }

    console.log("commandClick: " + commandClick);
    console.log(get_link);

    await fetch(get_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        limit: 0,
        emailS: emailS,
        codeS: codeS,
        user_id: this_user_id,
        search_body: search_body,
        type: commandClick,
        getMore: 0,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        //console.log(1);

        if (parseInt(data?.id) === 0) {
          setCantLoadMore(true);
        } else if (parseInt(data?.id) === 1) {
          let response_data = JSON.parse(data?.data);
          //console.log(response_data);
          setList(response_data);
          if (response_data.length <= 5) {
            setCantLoadMore(true);
          } else setCantLoadMore(false);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setShowNumber(5);
    //setCantLoadMore(false);
    setLoadMore(false);
    setLoading(false);
    setRefresh(false);
  };

  console.log("cant load: " + cant_load_more);
  useFocusEffect(
    React.useCallback(() => {
      fetchData(commandLine, commandClick);
    }, [navigation])
  );

  const renderItem_friend = ({ item }) => {
    if (item?.FriendRelation?.id !== undefined)
      return (
        <Friend_suggest_single
          id={item?.FriendRelation?.id}
          user_id_2={item?.User?.id}
          user_account_2={item?.User?.email}
          user_name_2={item?.User?.fullname}
          address={item?.User?.address}
          created={item?.FriendRelation?.created}
          modified={item?.FriendRelation?.modified}
          emailS={emailS}
          codeS={codeS}
          navigation={navigation}
          user_id={this_user_id}
        />
      );
  };

  const renderItem_post = ({ item }) => {
    if (item?.Post?.id !== undefined) {
      return (
        <SinglePost
          id={item?.Post?.id}
          author_id={item?.Post?.user_id}
          author_account={item?.Post?.user_account}
          author_name={item?.Post?.user_name}
          post_body={item?.Post?.post_body}
          img_num={item?.Post?.img_num}
          created={item?.Post?.created}
          modified={item?.Post?.modified}
          share_id={item?.Post?.share_id}
          emailS={emailS}
          codeS={codeS}
          navigation={navigation}
          user_id={this_user_id}
          publicity_state={item?.Post?.publicity_state}
          setShowIndex={setShowIndex}
          setShowPostID={setShowPostID}
          fullView={false}
          setSharePost={setSharePost}
          onOpen={onOpen}
          onClose={onClose}
        />
      );
    }
  };

  const renderItem_search = ({ item }) => {
    if (item?.SearchHistory?.id !== undefined)
      return (
        <Search_history_single
          id={item?.SearchHistory.id}
          search_body={item?.SearchHistory.search_body}
          created={item?.SearchHistory.created}
          setSearchBody={setSearchBody}
        />
      );
  };

  const memoizedList = React.useMemo(() => {
    return list;
  }, [search_body, commandLine]);

  const memoizedValue = React.useMemo(() => {
    if (commandLine === 0) {
      return renderItem_search;
    } else if (commandLine === 1) {
      return renderItem_post;
    } else if (commandLine === 2) {
      return renderItem_friend;
    }
  }, [commandLine, showNumber, load_more]);

  //console.log(list);

  console.log(cant_load_more);

  const LoadingScreen = () => {
    return (
      <HStack space={2} justifyContent="center" py="4" bgcolor="white">
        <Spinner accessibilityLabel="Loading friends" color="green.600" />
        <Heading color="green.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  };

  const EmptyScreen = () => {
    if (loading) {
      return (
        <HStack space={2} justifyContent="center" py="4" bgcolor="white">
          <Spinner accessibilityLabel="Loading friends" color="green.600" />
          <Heading color="green.500" fontSize="md">
            Đang tìm kiếm
          </Heading>
        </HStack>
      );
    } else {
      return (
        <HStack space={2} justifyContent="center" py="4" bgcolor="white">
          <Heading color="green.500" fontSize="md">
            Không có lịch sử tìm kiếm
          </Heading>
        </HStack>
      );
    }
  };

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, []);
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [loading]);

  return (
    <Box flex="1" mt="0" bgColor="white">
      <Share_post
        isOpenShare={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        emailS={emailS}
        codeS={codeS}
        share_post_id={share_post_id}
      />
      <HStack bgColor="white" justifyContent={"center"}>
        <VStack>
          <IconButton
            mr="3"
            size="md"
            variant="ghost"
            alignSelf="flex-end"
            _icon={{
              as: AntDesign,
              name: "arrowleft",
              color: "#137950",
              size: "xl",
            }}
            onPress={() => navigation.navigate("Home")}
          />
        </VStack>
        <VStack mt="1">
          <Input
            variant="rounded"
            placeholder="Nhập nội dung tìm kiếm"
            w={"240"}
            value={search_body}
            onChangeText={(text) => setSearchBody(text)}
          />
        </VStack>
        <Spacer></Spacer>
        <VStack alignSelf="flex-end">
          <IconButton
            mr="3"
            size="md"
            variant="ghost"
            alignSelf="flex-end"
            _icon={{
              as: EvilIcons,
              name: "search",
              color: "#137950",
              size: "xl",
            }}
            onPress={async () => {
              await setList([]);
              await setCommandLine(commandClick);
              refreshData(commandClick, commandClick);
            }}
          />
        </VStack>
      </HStack>
      <VStack mx="2" mt="2">
        <Divider
          thickness="2"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
      </VStack>

      <HStack ml="4" mt="2">
        <Button.Group>
          <Button
            bgColor={commandClick === 1 ? "green.700" : "white"}
            variant={commandClick === 1 ? "solid" : "ghost"}
            _text={{
              color: commandClick !== 1 ? "green.600" : "white",
            }}
            onPress={async () => {
              await setList([]);
              await setCommandLine(0);
              await setCommandLineClick(1);
              await setLoading(true);
              refreshData(0, 1);
            }}
          >
            Bài viết
          </Button>
          <Button
            bgColor={commandClick === 2 ? "green.700" : "white"}
            variant={commandClick === 2 ? "solid" : "ghost"}
            _text={{
              color: commandClick !== 2 ? "green.600" : "white",
            }}
            onPress={async () => {
              await setList([]);
              await setCommandLine(0);
              await setCommandLineClick(2);
              await setLoading(true);
              refreshData(0, 2);
            }}
          >
            Mọi người
          </Button>
        </Button.Group>
      </HStack>

      <HStack flex="1">
        <FlatList
          data={list}
          renderItem={memoizedValue}
          keyExtractor={(item) => {
            if (commandLine === 0) return item?.SearchHistory.id;
            else if (commandLine === 1) return item?.Post.id;
            else if (commandLine === 2) return item?.FriendRelation.id;
          }}
          ListHeaderComponent={() => {
            if (commandLine === 0)
              return (
                <Heading mt="5" mx="5" fontSize={18}>
                  Lịch sử tìm kiếm
                </Heading>
              );
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={!cant_load_more && memoLoadingScreen()}
          ListEmptyComponent={cant_load_more && memoEmptyScreen}
          onEndReached={() => {
            if (!cant_load_more) {
              setLoadMore(true);
              fetchData(commandLine, commandClick);
            }
          }}
        />
      </HStack>
    </Box>
  );
}
