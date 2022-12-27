import React, { memo } from "react";

import {
  HStack,
  VStack,
  Center,
  Flex,
  Badge,
  Stack,
  Spacer,
  IconButton,
  Box,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { Image } from "react-native";

import { Dimensions } from "react-native";

export default function image_show({ img_asset, setImage }) {
  const img_num = img_asset.length;
  const img_asset_now = img_asset;
  //console.log(img_asset);

  function Cancel_img(index) {
    if (img_num === 1) {
      setImage([]);
    } else if (img_num === 2) {
      if (index === 0) {
        setImage([img_asset[1]]);
      } else if (index === 1) {
        setImage([img_asset[0]]);
      }
    } else if (img_num === 3) {
      if (index === 0) {
        setImage([img_asset[1], img_asset[2]]);
      } else if (index === 1) {
        setImage([img_asset[0], img_asset[2]]);
      } else if (index === 2) {
        setImage([img_asset[0], img_asset[1]]);
      }
    } else if (img_num === 4) {
      if (index === 0) {
        setImage([img_asset[1], img_asset[2], img_asset[3]]);
      } else if (index === 1) {
        setImage([img_asset[0], img_asset[2], img_asset[3]]);
      } else if (index === 2) {
        setImage([img_asset[0], img_asset[1], img_asset[3]]);
      } else if (index === 3) {
        setImage([img_asset[0], img_asset[1], img_asset[2]]);
      }
    }
  }

  const dimensions = Dimensions.get("window");

  if (img_num === 1) {
    return (
      <Box>
        <Center>
          <Badge // bg="red.400"
            colorScheme="danger"
            rounded="full"
            mb={-12}
            mr={-2}
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
          <HStack>
            <Image
              style={{
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "black",
                width: dimensions.width - 40,
                height:
                  (img_asset[0]?.height * (dimensions.width - 10)) /
                  img_asset[0]?.width,
              }}
              source={{ uri: img_asset[0]?.uri }}
            />
          </HStack>
        </Center>
      </Box>
    );
  }
  if (img_num === 2) {
    return (
      <Flex space="4">
        <Center>
          <HStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
              <Image
                style={{
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[0]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[0]?.width,
                }}
                source={{ uri: img_asset[0]?.uri }}
              />
            </VStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
              <Image
                style={{
                  marginLeft: 3,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[1]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[1]?.width,
                }}
                source={{ uri: img_asset[1]?.uri }}
              />
            </VStack>
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 3) {
    return (
      <Flex>
        <Center>
          <HStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
              <Image
                style={{
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[0]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[0]?.width,
                }}
                source={{ uri: img_asset[0]?.uri }}
              />
            </VStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
              <Image
                style={{
                  marginLeft: 3,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[1]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[1]?.width,
                }}
                source={{ uri: img_asset[1]?.uri }}
              />
            </VStack>
          </HStack>

          <HStack mt="4">
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-2}
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
                  onPress={() => Cancel_img(2)}
                />
              </Badge>

              <Image
                style={{
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width - 40,
                  height:
                    (img_asset[0]?.height * (dimensions.width - 10)) /
                    img_asset[0]?.width,
                }}
                source={{ uri: img_asset[2]?.uri }}
              />
            </VStack>
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 4) {
    return (
      <Flex>
        <Center>
          <HStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
              <Image
                style={{
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[0]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[0]?.width,
                }}
                source={{ uri: img_asset[0]?.uri }}
              />
            </VStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
              <Image
                style={{
                  marginLeft: 3,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[1]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[1]?.width,
                }}
                source={{ uri: img_asset[1]?.uri }}
              />
            </VStack>
          </HStack>

          <HStack mt="4">
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
                  onPress={() => Cancel_img(2)}
                />
              </Badge>
              <Image
                style={{
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[0]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[0]?.width,
                }}
                source={{ uri: img_asset[2]?.uri }}
              />
            </VStack>
            <VStack>
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-12}
                mr={-3.5}
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
                  onPress={() => Cancel_img(3)}
                />
              </Badge>
              <Image
                style={{
                  marginLeft: 3,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "black",
                  width: dimensions.width / 2 - 10,
                  height:
                    (img_asset[1]?.height * (dimensions.width / 2 - 10)) /
                    img_asset[1]?.width,
                }}
                source={{ uri: img_asset[3]?.uri }}
              />
            </VStack>
          </HStack>
        </Center>
      </Flex>
    );
  }
}
