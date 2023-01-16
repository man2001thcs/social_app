import React from "react";
import { FlatList } from "react-native";
import { HStack, Box, Heading, Spinner } from "native-base";

import FriendAccept from "./component/friend/friend_accept";
import Friend_bar from "./component/friend/friend_bar";
import link from "../../../config/const";
import FriendSuggestList from "./component/friend/friend_suggest";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation } from "@react-navigation/native";

export default function FriendList({ emailS, codeS, this_user_id, navigation }) {
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [friend_list, setFriendRequestList] = React.useState([]);

  const fetchData = async () => {
    const getFriendRequest_link =
      link.friend_request_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    await fetch(getFriendRequest_link, {
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
        console.log("Success", data);
        if (parseInt(data?.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.id) === 1) {
          setShowNumber(showNumber + 10);
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setFriendRequestList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setLoadMore(false);
  };

  //console.log(friend_list);

  const refreshData = async () => {
    const getFriendRequest_link =
      link.friend_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = { limit: 0, emailS: emailS, codeS: codeS, getMore: 0 };

    await fetch(getFriendRequest_link, {
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
        let response_data = JSON.parse(data?.data);
        console.log(response_data);
        if (response_data?.data === "null") response_data = [];
        setFriendRequestList(response_data);
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setShowNumber(10);
    setCantLoadMore(false);
    setLoadMore(false);
    setRefresh(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <FriendAccept
        id={item?.FriendRelation.id}
        user_id_2={item?.FriendRelation.user_id}
        user_account_2={item?.FriendRelation.user_account_2}
        user_name_2={item?.User.fullname}
        created={item?.FriendRelation.created}
        modified={item?.FriendRelation.modified}
        emailS={emailS}
        codeS={codeS}
        navigation={navigation}
        user_id={this_user_id}
        refreshData={refreshData}
      />
    );
  };

  const memoizedValue = React.useMemo(
    () => renderItem,
    [friend_list]
  );

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
    return (
      <HStack space={2} justifyContent="center" py="4" bgcolor="white">
        <Heading color="green.500" fontSize="md">
          Không có lời mời kết bạn nào
        </Heading>
      </HStack>
    );
  };

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, []);
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, []);

  return (
    <Box flex="1" mt="0" bgColor="white">
      <HStack>
        <FlatList
          data={friend_list}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.FriendRelation.id}
          ListHeaderComponent={() => {
            return (
              <Friend_bar
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
      <FriendSuggestList
        emailS={emailS}
        codeS={codeS}
        navigation={navigation}
        user_id={this_user_id}
      />
    </Box>
  );
}
