import React, { memo } from "react";
import { HStack, Center, Flex, Spacer } from "native-base";
import { Dimensions, Pressable } from "react-native";

import link from "../../../../../../config/const";
import AutoHeightImage from "react-native-auto-height-image";
import { useNavigation } from "@react-navigation/native";
import GenerateRandomCode from "react-random-code-generator";
//image show function in post
function Image_show(props) {
  const dimensions = Dimensions.get("window");
  const comment_img_link = link.comment_image_link + props.id + "/";
  const navigation = useNavigation();
  //console.log("created:" + props.id);

  const PressImage = () => {
    
    navigation.navigate("CommentImgPreview", {
      id: props.id,
      time_distance_5: props.time_distance_5,
      time_modified: props.time_modified
    });
    
  };
  //console.log("num: " + props.img_num);

  if (props.img_num === 1) {
    var uri_this =
      comment_img_link +
      "1" +
      ".png?TimeStamp=" +
      GenerateRandomCode.TextCode(8);
    //console.log(uri_this);
    return (
      <HStack>
        <Center>
          <HStack>
            <Pressable onPress={() => PressImage()}>
              <AutoHeightImage
                source={{ uri: uri_this }}
                width={(dimensions.width * 3) / 4}
                style={{
                  borderRadius: 20,
                  borderColor: "#949494",
                  borderWidth: 1.5,
                }}
              />
            </Pressable>
          </HStack>
        </Center>
      </HStack>
    );
  }
}

export default memo(Image_show);
