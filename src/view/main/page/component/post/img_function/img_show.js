import React, { memo } from "react";
import { HStack, Center, Flex, Spacer } from "native-base";
import { Dimensions, Pressable } from "react-native";

import link from "../../../../../../config/const";
import AutoHeightImage from "react-native-auto-height-image";
import { useNavigation } from "@react-navigation/native";
//image show function in post
function Image_show(props) {
  const dimensions = Dimensions.get("window");
  const post_link = link.image_link + props.id + "/";
  const navigation = useNavigation();
  //console.log("created:" + props.img_num);

  const PressImage = (select_img) => {
    navigation.navigate("Single_post_img_view", {
      id: props.id,
      author_id: props.author_id,
      author_account: props.author_account,
      author_name: props.author_name,
      post_body: props.post_body,
      img_num: props.img_num,
      like_num: props.like_num,
      dislike_num: props.dislike_num,
      love_num: props.love_num,
      hate_num: props.hate_num,
      created: props.created,
      modified: props.modified,
      comment_num: props.comment_num,
      emailS: props.emailS,
      codeS: props.codeS,
      fullView: 1,
      select_img: select_img,
    });
  };
  function FullView_Image() {
    if (props.img_num == 2) {
      return (
        <Center>
          <HStack>
            <Pressable onPress={() => PressImage(0)}>
              <AutoHeightImage
                source={{ uri: post_link + 1 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
          <HStack>
            <Pressable onPress={() => PressImage(1)}>
              <AutoHeightImage
                source={{ uri: post_link + 2 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
        </Center>
      );
    }
    if (props.img_num == 3) {
      return (
        <Center>
          <HStack>
            <Pressable onPress={() => PressImage(0)}>
              <AutoHeightImage
                source={{ uri: post_link + 1 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
          <HStack>
            <Pressable onPress={() => PressImage(1)}>
              <AutoHeightImage
                source={{ uri: post_link + 2 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
          <HStack>
            <Pressable onPress={() => PressImage(2)}>
              <AutoHeightImage
                source={{ uri: post_link + 3 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
        </Center>
      );
    }

    if (props.img_num == 4) {
      return (
        <Center>
          <HStack>
            <Pressable onPress={() => PressImage(0)}>
              <AutoHeightImage
                source={{ uri: post_link + 1 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
          <HStack>
            <Pressable onPress={() => PressImage(1)}>
              <AutoHeightImage
                source={{ uri: post_link + 2 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
          <HStack>
            <Pressable onPress={() => PressImage(2)}>
              <AutoHeightImage
                source={{ uri: post_link + 3 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
          <HStack>
            <Pressable onPress={() => PressImage(3)}>
              <AutoHeightImage
                source={{ uri: post_link + 4 + ".png" }}
                width={dimensions.width - 10}
              />
            </Pressable>
          </HStack>
        </Center>
      );
    }
  }

  if (props.img_num === 1) {
    var uri_this = post_link + "1" + ".png";

    return (
      <Center>
        <HStack>
          <Pressable onPress={() => PressImage(0)}>
            <AutoHeightImage
              source={{ uri: uri_this }}
              width={dimensions.width - 10}
            />
          </Pressable>
        </HStack>
      </Center>
    );
  }

  if (props.fullView === 1) {
    for (var i = 1; i <= props.img_num; i++) {
      return (
        <Flex>
          <Center>{FullView_Image()}</Center>
        </Flex>
      );
    }
  } else {
    if (props.img_num === 2) {
      var uri_this1 = post_link + "1" + ".png";
      var uri_this2 = post_link + "2" + ".png";
      return (
        <Flex>
          <Center>
            <HStack>
              <AutoHeightImage
                source={{ uri: uri_this1 }}
                width={(dimensions.width - 5) / 2}
              />
              <Spacer></Spacer>
              <AutoHeightImage
                source={{ uri: uri_this2 }}
                width={(dimensions.width - 5) / 2}
              />
            </HStack>
          </Center>
        </Flex>
      );
    }
    if (props.img_num === 3) {
      var uri_this1 = post_link + "1" + ".png";
      var uri_this2 = post_link + "2" + ".png";
      var uri_this3 = post_link + "3" + ".png";
      return (
        <Flex>
          <Center>
            <HStack mb="1">
              <AutoHeightImage
                source={{ uri: uri_this1 }}
                width={dimensions.width - 10}
              />
            </HStack>
            <HStack>
              <AutoHeightImage
                source={{ uri: uri_this2 }}
                width={(dimensions.width - 5) / 2}
              />
              <Spacer></Spacer>
              <AutoHeightImage
                source={{ uri: uri_this3 }}
                width={(dimensions.width - 5) / 2}
              />
            </HStack>
          </Center>
        </Flex>
      );
    }
    if (props.img_num === 4) {
      var uri_this1 = post_link + "1" + ".png";
      var uri_this2 = post_link + "2" + ".png";
      var uri_this3 = post_link + "3" + ".png";
      var uri_this4 = post_link + "4" + ".png";
      return (
        <Flex>
          <Center>
            <HStack>
              <AutoHeightImage
                source={{ uri: uri_this1 }}
                width={(dimensions.width - 5) / 2}
              />
              <Spacer></Spacer>
              <AutoHeightImage
                source={{ uri: uri_this2 }}
                width={(dimensions.width - 5) / 2}
              />
            </HStack>
            <HStack mt="1">
              <AutoHeightImage
                source={{ uri: uri_this3 }}
                width={(dimensions.width - 5) / 2}
              />
              <Spacer></Spacer>
              <AutoHeightImage
                source={{ uri: uri_this4 }}
                width={(dimensions.width - 5) / 2}
              />
            </HStack>
          </Center>
        </Flex>
      );
    }
  }
}

export default memo(Image_show);
