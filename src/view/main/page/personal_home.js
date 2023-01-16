import React from "react";
import { FlatList } from "react-native";
import { HStack, Box, Heading, Spinner, Center } from "native-base";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";

import SinglePost from "./component/post/single_post/single_post";
import Home_badge from "./component/post/personal_home_toolbar/home_badge";
import link from "../../../config/const";
import Time_show from "./component/post/personal_home_toolbar/time_show";

function PersonalHome({ emailS, codeS, this_user_id, route_params }) {
  const [showNumber, setShowNumber] = React.useState(0);
  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [post_list, setPostList] = React.useState([]);

  const [info, setInfo] = React.useState([]);
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");

  console.log(info);
  const fetchData = async () => {
    const getPost_link =
      link.post_personal_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

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
        user_id: route_params.user_id_click,
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
          setPostList(response_data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setLoadMore(false);
  };

  console.log(route_params.user_account_click);

  const fetchInfo = async () => {
    const getPost_link =
      link.user_visit_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    await fetch(getPost_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        emailS_this: emailS,
        emailS_visit: route_params.user_account_click,
        codeS: codeS,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success info: ", data);
        if (parseInt(data?.id) === 1) {
          setInfo(data?.info_data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(post_list);

  const refreshData = async () => {
    const getPost_link =
      link.post_personal_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = {
      limit: 5,
      emailS: emailS,
      codeS: codeS,
      getMore: 0,
      user_id: route_params.user_id_click,
    };

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
          //console.log(response_data);
          setPostList(response_data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setShowNumber(5);
    setCantLoadMore(false);
    setLoadMore(false);
    setRefresh(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      fetchInfo();
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
        comment_num={item?.Post.comment_num}
        emailS={emailS}
        codeS={codeS}
        navigation={navigation}
        user_id={this_user_id}
        publicity_state={item?.Post.publicity_state}
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

  const FooterScreen = () => {
    return (
      <HStack space={2} bgcolor="white" justifyContent="center" mt="3">
        <Box backgroundColor="white" width={dimensions.width} py="4">
          <Center>
            <Heading color="green.500" fontSize="md">
              Tham gia ngày <Time_show created={info?.User?.created ?? ""} />
            </Heading>
          </Center>
        </Box>
      </HStack>
    );
  };

  const EmptyScreen = () => {
    return (
      <HStack space={2} bgcolor="white" justifyContent="center" mt="3">
        <Box backgroundColor="white" width={dimensions.width} py="4">
          <Center>
            <Heading color="green.500" fontSize="md">
              Không có bài viết
            </Heading>
          </Center>
        </Box>
      </HStack>
    );
  };

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, [post_list]);
  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [post_list]);
  const memoFooterScreen = React.useMemo(() => FooterScreen, [info]);
  return (
    <Box flex="1" mt="0">
      <HStack>
        <FlatList
          data={memoizedList}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.Post.id}
          ListHeaderComponent={() => {
            return (
              <Home_badge
                emailS={emailS}
                codeS={codeS}
                user_id={route_params.user_id_click}
                info={info}
                visit={route_params.user_account_click !== emailS}
              />
            );
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            !cant_load_more ? memoLoadingScreen() : memoFooterScreen()
          }
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

export default React.memo(PersonalHome);
