import React, { memo } from "react";
import {
  HStack,
  Center,
  Flex,
  Spacer,
  Box,
  StatusBar,
  VStack,
} from "native-base";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import link from "../../../../../../config/const";
import AutoHeightImage from "react-native-auto-height-image";
import { useNavigation } from "@react-navigation/native";
import GenerateRandomCode from "react-random-code-generator";
import Time_show from "../time_function/time_show";
//image show function in post
function Image_show({ emailS, codeS, route_params }) {
  const dimensions = Dimensions.get("window");
  //const comment_img_link = link.comment_image_link + route_params.id + "/";
  const navigation = useNavigation();
  //console.log(route_params);
  const img_link = link.image_link + route_params.id + "/";
  const [img_arr, setImg_arr] = React.useState([
    {
      img:
        link.comment_image_link +
        route_params?.id +
        "/" +
        "1.png?TimeStamp=" +
        GenerateRandomCode.TextCode(8),
    },
  ]);

  return (
    <Box pb="2" px="1" pt="2" bgColor="black">
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Box height={(dimensions.height * 19) / 20}>
        <ImageSlider
          data={img_arr}
          autoPlay={false}
          onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
        />
      </Box>
      <Box
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        bgColor="black:alpha.50"
        zIndex={1}
      >
        <HStack>
          <Time_show
            time_distance={route_params?.time_distance_5}
            time_modified={route_params?.time_modified}
            color="white"
          />
        </HStack>
      </Box>
    </Box>
  );
}

export default memo(Image_show);
