import React, { useState } from "react";
import link from "../../config/const";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  NativeBaseProvider,
  FormControl,
  WarningOutlineIcon,
  Box,
  extendTheme,
  Button,
  Divider,
  Heading,
  Flex,
  Spacer,
  ScrollView,
  HStack,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { CheckIcon } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import GenerateRandomCode from "react-random-code-generator";
import { Dimensions } from "react-native";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [show, setShow] = React.useState(false);
  
  const dimensions = Dimensions.get("window");

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required email!"),
    passwordS: Yup.string()
      .min(2, "Require longer password!")
      .max(70, "Password is too long!")
      .required("Required password!"),
    re_passwordS: Yup.string()
      .oneOf([Yup.ref("passwordS"), null], "Passwords don't match!")
      .min(2, "Require longer password!")
      .max(70, "Password is too long!")
      .required("Required password!"),
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

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box bgColor="white">
          <Flex direction="row" space={8} mb="4">
            <Button
              variant="ghost"
              h="10"
              w="20"
              endIcon={
                <Icon
                  as={Ionicons}
                  name="arrow-back"
                  size="xl"
                  color="#137950"
                />
              }
              onPress={() => navigation.navigate("Login")}
            />
            <Heading size="md" mt="2">
              Đăng kí
            </Heading>

            <Spacer></Spacer>
          </Flex>

          <Box alignSelf="center" mb="4">
            <Image
              source={require("../../img/log/background.jpg")}
              style={{
                width: dimensions.width,
                height: 230,
              }}
            />
          </Box>
          <Formik
            validationSchema={SignupSchema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              emailS: "",
              passwordS: "",
              re_passwordS: "",
              fullname: "",
              phone_number: "",
              address: "",
              codeS: GenerateRandomCode.TextCode(8),
            }}
            onSubmit={(values) => {
              console.log(values);
              fetch(link.server_link + "controller/user/sign_in.php", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("Success:", data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
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
                <FormControl isInvalid={errors.emailS} w="75%" maxW="300px">
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    name="emailS"
                    placeholder="Enter email"
                    onChangeText={handleChange("emailS")}
                    onBlur={handleBlur("emailS")}
                    value={values.emailS}
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                  />
                  {errors.emailS && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.emailS}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={errors.passwordS} w="75%" maxW="300px">
                  <FormControl.Label>Password</FormControl.Label>
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

                <FormControl isInvalid={errors.fullname} w="75%" maxW="300px">
                  <FormControl.Label>Full name</FormControl.Label>
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
                  <FormControl.Label>Address</FormControl.Label>
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
                  <FormControl.Label>Phone number</FormControl.Label>
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
                  >
                    Submit
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
