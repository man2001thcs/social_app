import React from "react";

import {
  HStack,
  VStack,
  Spacer,
  Divider,
  Heading,
  Button,
  IconButton,
  Input,
} from "native-base";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function SearchBar({search_body, setSearchBody}) {
  const navigation = useNavigation();
  return (
    <VStack my="3">
      <HStack bgColor="white" justifyContent={"center"}>
        <VStack>
          <IconButton
            mr="3"
            size="md"
            variant="ghost"
            alignSelf="flex-end"
            _icon={{
              as: AntDesign,
              name: "arrowleft",
              color: "#137950",
              size: "xl",
            }}
            onPress={() => navigation.navigate("Home")}
          />
        </VStack>
        <VStack mt="1">
          <Input
            variant="rounded"
            placeholder="Nhập nội dung tìm kiếm"
            w={"240"}
            onChangeText={() => setSearchBody(search_body)}
          />
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
      <VStack mx="2" mt="2">
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

export default React.memo(SearchBar);
