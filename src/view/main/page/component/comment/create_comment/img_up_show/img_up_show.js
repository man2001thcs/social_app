import React from "react";
import {
  HStack,
  Center,
  Flex,
  Badge,
  Stack,
  IconButton,
  Box,
} from "native-base";
import {Image, Dimensions} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function image_show(img_asset, setImage) {
  //get images bundle number (MAXIMUM 2), and the width and length of the device
  const img_num = img_asset.length;
  const dimensions = Dimensions.get("window");
  const width_small = dimensions.width / 4;

  //cancel image by x button
  function Cancel_img(index) {
    if (img_num === 1) {
      setImage([]);
    } else {
      if (index === 0) {
        setImage([img_asset[1]]);
      } else if (index === 1) {
        setImage([img_asset[0]]);
      }
    }
  }

  //if only 1 image is show
  if (img_num === 1) {
    return (
      <Flex mb="2" ml="2">
        <Center>
          <HStack alignItems="center">
            <Stack bgColor="gray.200" px="4" py="4" rounded="xl">
              <Image
                style={{
                  width: width_small - 10,
                  height:
                    (img_asset[0]?.height * (width_small - 10)) /
                    img_asset[0]?.width,
                }}
                source={{ uri: img_asset[0]?.uri }}
              />
            </Stack>

            <Badge // bg="red.400"
              colorScheme="danger"
              rounded="full"
              mb={85}
              ml={-6}
              zIndex={1}
              variant="ghost"
              alignSelf="flex-end"
            >
              <IconButton
                size="sm"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: MaterialIcons,
                  name: "cancel",
                  color: "red.500",
                  size: "xl",
                }}
                onPress={() => Cancel_img(0)}
              />
            </Badge>
          </HStack>
        </Center>
      </Flex>
    );
  }

  //if only 2 images is show
  if (img_num === 2) {
    return (
      <Flex ml="2">
        <Center>
          <HStack alignItems="center">
            <Box
              bgColor="gray.200"
              px="4"
              py="4"
              rounded="xl"
            >
              <Image
                style={{
                  width: width_small - 10,
                  height: (3 * (width_small - 10)) / 4,
                }}
                source={{ uri: img_asset[0]?.uri }}
              />
            </Box>
            <Badge // bg="red.400"
              colorScheme="danger"
              rounded="full"
              mb={85}
              ml={-6}
              zIndex={1}
              variant="ghost"
              alignSelf="flex-end"
            >
              <IconButton
                size="sm"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: MaterialIcons,
                  name: "cancel",
                  color: "red.500",
                  size: "xl",
                }}
                onPress={() => Cancel_img(0)}
              />
            </Badge>
            <Box
              bgColor="gray.200"
              px="4"
              py="4"
              rounded="xl"
            >
              <Image
                style={{
                  width: width_small - 10,
                  height:
                    (img_asset[1]?.height * (width_small - 10)) /
                    img_asset[1]?.width,
                }}
                source={{ uri: img_asset[1]?.uri }}
              />
            </Box>
            <Badge // bg="red.400"
              colorScheme="danger"
              rounded="full"
              mb={85}
              ml={-6}
              zIndex={1}
              variant="ghost"
              alignSelf="flex-end"
            >
              <IconButton
                size="sm"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: MaterialIcons,
                  name: "cancel",
                  color: "red.500",
                  size: "xl",
                }}
                onPress={() => Cancel_img(1)}
              />
            </Badge>
          </HStack>
        </Center>
      </Flex>
    );
  }
}
