import React, { useState } from "react";
import link from "../../../../../../config/const";

import {
  Input,
  Stack,
  NativeBaseProvider,
  FormControl,
  WarningOutlineIcon,
  Box,
  Button,
  Divider,
  ScrollView,
  HStack,
  Spacer,
  Pressable,
  Icon,
  useToast,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { Formik } from "formik";
import * as Yup from "yup";
import GenerateRandomCode from "react-random-code-generator";
import { Dimensions } from "react-native";

import ToastAlert from "../../alert";

export default function Information({ emailS, codeS, info }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = React.useState(false);
  const toast = useToast();

  const dimensions = Dimensions.get("window");

  const SignupSchema = Yup.object().shape({
    passwordS: Yup.string(),
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required address!!"),
    phone_number: Yup.number("Invalid number!!").required("Required number!!"),
  });
  console.log(info);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box bgColor="white" height={dimensions.height - 90}>
          <Formik
            validationSchema={SignupSchema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              emailS: emailS,
              codeS: codeS,
              fullname: info?.fullname,
              phone_number: info?.phone_number,
              address: info?.address,
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              fetch(
                link.server_link +
                  "controller/user/edit.php?timeStamp=" +
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
                  console.log("Success", data);
                  if (data?.code === "USER_EDIT_OK") {
                    toast.show({
                      render: ({ id }) => {
                        return (
                          <ToastAlert
                            id={id}
                            title="Đổi thông tin cá nhân"
                            variant="solid"
                            description="Thay đổi thành công"
                            isClosable={true}
                          />
                        );
                      },
                    });
                  } else if (data?.code === "USER_PASSWORD_WRONG") {
                    toast.show({
                      render: ({ id }) => {
                        return (
                          <ToastAlert
                            id={id}
                            title="Đổi thông tin cá nhân"
                            variant="solid"
                            description="Mật khẩu sai, vui lòng nhập lại"
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
                            title="Đổi thông tin cá nhân thất bại"
                            variant="solid"
                            description="Vui lòng kiểm tra lại thông tin"
                            isClosable={true}
                          />
                        );
                      },
                    });
                  }
                })
                .catch((error) => {
                  toast.show({
                    render: ({ id }) => {
                      return (
                        <ToastAlert
                          id={id}
                          title="Đổi thông tin cá nhân thất bại"
                          variant="solid"
                          description={"Lỗi: " + error}
                          isClosable={true}
                        />
                      );
                    },
                  });
                });

              actions.resetForm({
                values: {
                  // the type of `values` inferred to be Blog
                  emailS: emailS,
                  codeS: codeS,
                  fullname: info?.fullname,
                  phone_number: info?.phone_number,
                  address: info?.address,
                },

                // you can also set the other form states here
              });
              actions.setSubmitting(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              values,
              errors,
              isValid,
            }) => (
              <Stack
                space={4}
                w="100%"
                alignItems="center"
                bgColor="white"
                px="3"
              >
                <FormControl isInvalid={errors.fullname} w="75%" maxW="300px">
                  <FormControl.Label>Họ và tên</FormControl.Label>
                  <Input
                    name="fullname"
                    placeholder="Enter name"
                    onChangeText={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                    value={values.fullname}
                    type={"text"}
                  />
                  {errors.fullname && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.fullname}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={errors.address} w="75%" maxW="300px">
                  <FormControl.Label>Địa chỉ</FormControl.Label>
                  <Input
                    name="address"
                    placeholder="Enter address"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                    type={"text"}
                  />
                  {errors.address && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.address}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  isInvalid={errors.phone_number}
                  w="75%"
                  maxW="300px"
                >
                  <FormControl.Label>Số điện thoại</FormControl.Label>
                  <Input
                    name="phone_number"
                    placeholder="Enter phone number"
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    type={"text"}
                  />
                  {errors.phone_number && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.phone_number}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={errors.passwordS} w="75%" maxW="300px">
                  <FormControl.Label>New password</FormControl.Label>
                  <Input
                    name="passwordS"
                    placeholder="Enter password"
                    onChangeText={handleChange("passwordS")}
                    onBlur={handleBlur("passwordS")}
                    value={values.passwordS}
                    type={show ? "text" : "password"}
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="vpn-key" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                    InputRightElement={
                      <Pressable onPress={() => setShow(!show)}>
                        <Icon
                          as={
                            <MaterialIcons
                              name={show ? "visibility" : "visibility-off"}
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      </Pressable>
                    }
                  />
                  {errors.passwordS && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.passwordS}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <HStack px="4">
                  <Divider
                    my="2"
                    thickness="1"
                    _light={{
                      bg: "muted.400",
                    }}
                    _dark={{
                      bg: "muted.50",
                    }}
                  />
                </HStack>

                <HStack px="4" mb="12">
                  <Button
                    title="Login"
                    w="100%"
                    onPress={() => handleSubmit()}
                    bgColor="#137950"
                    isLoading={isSubmitting}
                    isLoadingText="Đang chỉnh sửa"
                  >
                    Hoàn thành
                  </Button>
                </HStack>
              </Stack>
            )}
          </Formik>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}
