import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { HStack, Box, Heading, Spinner, Divider } from "native-base";
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import FriendSuggestSingle from "./friend_suggest_single";
import link from "../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation } from "@react-navigation/native";

export default function FriendSuggestList({ emailS, codeS, this_user_id }) {
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [friend_list, setFriendRequestList] = React.useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const getFriendRequest_link =
      link.friend_suggest_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
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
        //console.log("Success", data);
        if (parseInt(data?.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.id) === 1) {
          setShowNumber(showNumber + 10);
          let response_data = JSON.parse(data?.data);
          //console.log(response_data);
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
      link.friend_suggest_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    //console.log(1);
    var values = { limit: 10, emailS: emailS, codeS: codeS, getMore: 0 };

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
        //console.log(response_data);
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

  /*
  useEffect(() => {
    fetchData();
  }, [navigation]);
  */

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [navigation])
  );

  const renderItem = ({ item }) => {
    return (
      <FriendSuggestSingle
        id={item?.FriendRelation.id}
        user_id_2={item?.User.id}
        user_account_2={item?.User.email}
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

  const memoizedList = React.useMemo(() => {
    return friend_list;
  }, [friend_list]);

  const memoizedValue = React.useMemo(
    () => renderItem,
    [showNumber, load_more]
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
          Hiện tại chưa có gợi ý nào
        </Heading>
      </HStack>
    );
  };

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, [friend_list]);
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [friend_list]);

  return (
    <Box flex="1">
      <Divider
        thickness="2"
        _light={{
          bg: "muted.400",
        }}
        _dark={{
          bg: "muted.50",
        }}
      />
      <Heading size="md" color="black" fontWeight="bold" ml="4" my="2.5">
        Gợi ý
      </Heading>
      <FlatList
        data={memoizedList}
        renderItem={memoizedValue}
        keyExtractor={(item) => item?.User.id}
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
    </Box>
  );
}
