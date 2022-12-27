import React from "react";

import {
  HStack,
  VStack,
  Spacer,
  Divider,
  Heading,
  IconButton
} from "native-base";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";

function NotifyBar() {
  return (
    <VStack my="3">
      <HStack bgColor="white">
        <VStack>
          <Heading size="md" color="black" fontWeight="bold" ml="4" mt="2.5">
            Thông báo
          </Heading>
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
          />
        </VStack>
      </HStack>
      <VStack mx="2">
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
    </VStack>
  );
}

export default React.memo(NotifyBar);
