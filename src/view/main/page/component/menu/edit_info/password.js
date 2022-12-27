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
import ToastAlert from "../../alert";

import { Formik } from "formik";
import * as Yup from "yup";
import GenerateRandomCode from "react-random-code-generator";
import { Dimensions } from "react-native";

export default function Password({ emailS, codeS, info }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const dimensions = Dimensions.get("window");

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required email!"),
    oldpasswordS: Yup.string()
      .min(2, "Require longer password!")
      .max(70, "Password is too long!")
      .required("Required password!"),
    passwordS: Yup.string()
      .min(2, "Require longer password!")
      .max(70, "Password is too long!")
      .required("Required password!"),
    re_passwordS: Yup.string()
      .oneOf([Yup.ref("passwordS"), null], "Passwords don't match!")
      .min(2, "Require longer password!")
      .max(70, "Password is too long!")
      .required("Required password!"),
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
              oldpasswordS: "",
              passwordS: "",
              re_passwordS: "",
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              fetch(
                link.server_link +
                  "controller/user/change_password.php?timeStamp=" +
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
                            title="Đổi mật khẩu"
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
                            title="Đổi mật khẩu thất bại"
                            variant="solid"
                            description="Mật khẩu cũ sai, vui lòng nhập lại"
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
                            title="Đổi mật khẩu thất bại"
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
                          title="Đổi mật khẩu thất bại"
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
                  oldpasswordS: "",
                  passwordS: "",
                  re_passwordS: "",
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
                <FormControl
                  isInvalid={errors.oldpasswordS}
                  w="75%"
                  maxW="300px"
                >
                  <FormControl.Label>Old password</FormControl.Label>
                  <Input
                    name="oldpasswordS"
                    placeholder="Enter password"
                    onChangeText={handleChange("oldpasswordS")}
                    onBlur={handleBlur("oldpasswordS")}
                    value={values.oldpasswordS}
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
                  {errors.oldpasswordS && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.oldpasswordS}
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

                <FormControl
                  isInvalid={errors.re_passwordS}
                  w="75%"
                  maxW="300px"
                >
                  <FormControl.Label>Re-enter password</FormControl.Label>
                  <Input
                    name="re_passwordS"
                    placeholder="Re-enter password"
                    onChangeText={handleChange("re_passwordS")}
                    onBlur={handleBlur("re_passwordS")}
                    value={values.re_passwordS}
                    type={"password"}
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="vpn-key" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                  />
                  {errors.re_passwordS && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.re_passwordS}
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
