import React, { useState } from "react";

import {
  Icon,
  Center,
  NativeBaseProvider,
  FormControl,
  WarningOutlineIcon,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Flex,
  Spacer,
  VStack,
  Avatar,
  Select,
  TextArea,
  CheckIcon,
  ScrollView,
  useToast,
} from "native-base";

import { Actionsheet, useDisclose, Text } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dimensions } from "react-native";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../../../../config/const";
import image_show from "../../../img_function/img_up_show";
import ToastAlert from "../../../../alert";

function Share_post({
  emailS,
  codeS,
  this_user_id,
  share_post_id,
  onOpen,
  onClose,
  isOpenShare,
}) {
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");
  const mime = require("mime");
  const toast = useToast();

  const SignupSchema = Yup.object().shape({
    post_body: Yup.string()
      .max(5000, "Nội dung dài quá quy định!!")
      .required("Cần nội dung!!"),
  });

  console.log("share: " + share_post_id);

  return (
    <Actionsheet
      isOpen={isOpenShare}
      onClose={() => onClose()}
      animationPreset={"fade"}
    >
      <Actionsheet.Content>
        <Formik
          validationSchema={SignupSchema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            emailS: emailS,
            codeS: codeS,
            post_body: "",
            post_share_id: share_post_id,
            publicity_state: 2,
          }}
          onSubmit={async (values, actions) => {
            //values.publicity_state = publicity_state;

            //console.log(values);

            await fetch(
              link.server_link +
                "controller/post/share.php?timeStamp=" +
                GenerateRandomCode.TextCode(8),
              {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log("Success: ", data);
                if (data?.code === "POST_CREATE_OK") {
                  actions.setSubmitting(false);
                  onClose();
                } else if (data?.code === "POST_CREATE_OK_NOTIFY_FAIL") {
                  actions.setSubmitting(false);
                  toast.show({
                    render: ({ id }) => {
                      return (
                        <ToastAlert
                          id={id}
                          title="Gửi thành công"
                          variant="solid"
                          description="Lỗi tạo notify"
                          isClosable={true}
                        />
                      );
                    },
                  });
                } else {
                  toast.show({
                    render: ({ id }) => {
                      return (
                        <ToastAlert
                          id={id}
                          title="Tạo bài thất bại"
                          variant="solid"
                          description="Vui lòng thử lại"
                          isClosable={true}
                        />
                      );
                    },
                  });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                toast.show({
                  render: ({ id }) => {
                    return (
                      <ToastAlert
                        id={id}
                        title="Tạo bài thất bại"
                        variant="solid"
                        description={"Error: " + error + ". Vui lòng thử lại"}
                        isClosable={true}
                      />
                    );
                  },
                });
              });

            actions.setSubmitting(false);

            actions.resetForm({
              values: {
                // the type of `values` inferred to be Blog
                emailS: emailS,
                codeS: codeS,
                post_body: "",
                publicity_state: 2,
                post_share_id: share_post_id,
              },

              // you can also set the other form states here
            });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            values,
            errors,
            isValid,
          }) => (
            <Box mb="2.5" bgColor="white">
              <Flex direction="row" space={8} mr="3" ml="3">
                <Heading size="md" mt="2">
                  Chia sẻ
                </Heading>

                <Spacer></Spacer>

                <Button
                  size="md"
                  variant="solid"
                  alignSelf="flex-end"
                  bgColor="#137950"
                  onPress={() => {
                    handleSubmit();
                  }}
                  isLoading={isSubmitting}
                  isLoadingText="Đang tạo"
                >
                  Đăng
                </Button>
              </Flex>

              <HStack>
                <Divider
                  my="1"
                  thickness="2"
                  _light={{
                    bg: "black.400",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                />
              </HStack>

              <HStack direction="row" space={8} px="3" mt="3">
                <VStack mt="3">
                  <Avatar
                    bg="green.500"
                    source={{
                      uri:
                        link.user_image_link +
                        parseInt(this_user_id) +
                        "/avatar/avatar_this.png?timeStamp=" +
                        GenerateRandomCode.TextCode(8),
                    }}
                  >
                    AJ
                  </Avatar>
                </VStack>

                <VStack>
                  <HStack>
                    <Heading size="sm">Thành Đô</Heading>
                  </HStack>

                  <HStack>
                    <Select
                      selectedValue={values.publicity_state}
                      name="publicity_state"
                      minWidth="40"
                      fontSize="xs"
                      height="10"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      value={values.publicity_state}
                      onValueChange={(itemValue) =>
                        setFieldValue("publicity_state", itemValue, false)
                      }
                    >
                      <Select.Item label="Công khai" value={2} />
                      <Select.Item label="Chỉ mình tôi" value={0} />
                      <Select.Item label="Chỉ bạn bè" value={1} />
                    </Select>
                  </HStack>
                </VStack>
              </HStack>

              <HStack my="3">
                <FormControl isInvalid={errors.post_body} maxH="300px">
                  <TextArea
                    mx="3"
                    w={dimensions.width - 20}
                    rowSpan={13}
                    placeholder="Nhập gì đó"
                    textAlign="left"
                    onChangeText={handleChange("post_body")}
                    value={values.post_body}
                    validateOnChange={false}
                    validateOnBlur={false}
                  />
                  {errors.post_body && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.post_body}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              </HStack>
            </Box>
          )}
        </Formik>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default React.memo(Share_post);
