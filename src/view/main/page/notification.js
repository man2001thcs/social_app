import React from "react";
import { FlatList } from "react-native";
import { HStack, Box, Heading, Spinner } from "native-base";

import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { AntDesign, FontAwesome5, EvilIcons } from "@expo/vector-icons";
import NotifySingle from "./component/notification/notify_single.js";
import Notify_bar from "./component/notification/notify_bar";

export default function NotifyList({
  emailS,
  codeS,
  navigation,
  this_user_id,
}) {
  const [show, setShow] = React.useState(false);
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [notification_list, setNotificationList] = React.useState([]);

  const fetchData = async () => {
    const getNotification_link =
      link.notify_list_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);
    console.log(getNotification_link);
    await fetch(getNotification_link, {
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
        console.log("Success note: ", data);
        if (parseInt(data?.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.id) === 1) {
          setShowNumber(showNumber + 10);
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setNotificationList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setLoadMore(false);
  };

  //console.log(notification);

  const refreshData = async () => {
    const getNotification_link =
      link.notify_list_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = { limit: 10, emailS: emailS, codeS: codeS, getMore: 0 };

    await fetch(getNotification_link, {
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
        setNotificationList(response_data);
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setShowNumber(10);
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
    //console.log(item?.Notification.showed);
    return (
      <NotifySingle
        id={item?.Notification.id}
        user_id_2={item?.User.id}
        user_account_2={item?.User.email}
        user_name_2={item?.User.fullname}
        created={item?.Notification.created}
        type={item?.Notification.type}
        post_id={item?.Notification.post_id}
        comment_id={item?.Notification.comment_id}
        emailS={emailS}
        codeS={codeS}
        navigation={navigation}
        user_id={this_user_id}
        showed={item?.Notification.showed}
        refreshData={refreshData}
      />
    );
  };

  const memoizedList = React.useMemo(() => {
    return notification_list;
  }, [notification_list]);

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
          Không có thông báo nào
        </Heading>
      </HStack>
    );
  };

  const memoLoadingScreen = React.useMemo(
    () => LoadingScreen,
    [notification_list]
  );
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [notification_list]);

  return (
    <Box flex="1" mt="0" bgColor="white">
      <HStack>
        <FlatList
          data={memoizedList}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.Notification.id}
          ListHeaderComponent={() => {
            return (
              <Notify_bar
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
