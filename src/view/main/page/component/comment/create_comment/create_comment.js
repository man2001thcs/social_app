import React, { useState } from "react";
import {
  FormControl,
  WarningOutlineIcon,
  Input,
  IconButton,
  HStack,
  useToast,
  Center,
} from "native-base";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../../config/const.js";
import image_show from "./img_up_show/img_up_show";
import ToastAlert from "../../alert.js";

function Create_comment({ emailS, codeS, post_id, refreshData }) {
  const dimensions = Dimensions.get("window");
  const mime = require("mime");
  const toast = useToast();

  const SignupSchema = Yup.object().shape({
    comment_body: Yup.string()
      .max(5000, "Nội dung dài quá quy định!!")
      .required("Cần nội dung!!"),
  });
  const [images, setImage] = useState([]);

  //Get image number from picker
  const getImageNum = (images) => {
    if (images === null || images.length === 0) {
      return 0;
    } else {
      if (images?.selected === undefined) {
        return 1;
      } else {
        return images?.selected.length;
      }
    }
  };

  //pick image function
  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted == false) {
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        //console.log(result);
        setImage([result]);
      }
    }
  };

  //show up uploaded images
  const show_up_img = () => {
    if (images != undefined && images != null && images.length !== 0) {
      return image_show(images, setImage);
    }
  };

  //console.log(images[0]);

  //handle single image to POST
  function handleImage1() {
    const payload = new FormData();
    payload.append("image", {
      uri: images[0].uri,
      type: mime.getType(images[0].uri),
      name: "1.png",
    });
    payload.append("emailS", emailS);
    payload.append("codeS", codeS);

    fetch(
      link.server_link +
        "controller/comment/save_img.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        body: payload,
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => res.text())
      .then((data) => {
        //console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Formik
      validationSchema={SignupSchema}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        emailS: emailS,
        codeS: codeS,
        post_id: post_id,
        comment_body: "",
      }}
      onSubmit={async (values, actions) => {
        values.img_num = getImageNum(images);
        //send request to create comment first
        await fetch(
          link.server_link +
            "controller/comment/create.php?timeStamp=" +
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
            //console.log("Success:", data);
            if (data?.code === "COMMENT_CREATE_OK") {
              refreshData();
              actions.setSubmitting(false);
            } else if (data?.code === "COMMENT_CREATE_OK_NOTIFY_FAIL") {
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
              actions.setSubmitting(false);
              toast.show({
                render: ({ id }) => {
                  return (
                    <ToastAlert
                      id={id}
                      title="Tạo bình luận thất bại"
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
            actions.setSubmitting(false);
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

        //upload images later
        if (images.length > 0 && images !== null && images !== undefined) {
          handleImage1();
        }

        actions.setSubmitting(false);

        //reset form input
        actions.resetForm({
          values: {
            emailS: emailS,
            codeS: codeS,
            post_id: post_id,
            comment_body: "",
          },
        });
        setImage([]);
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
        <FormControl
          isInvalid={errors.comment_body}
          maxH="300px"
          bgColor="white"
        >
          <HStack alignContent="center" px="3">
            <Center>{show_up_img()}</Center>
          </HStack>

          <HStack px="6" pb="2">
            {errors.comment_body && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.comment_body}
              </FormControl.ErrorMessage>
            )}
          </HStack>
          <HStack alignContent="center" px="3">
            <Input
              mx="3"
              placeholder="Nhập gì đó"
              textAlign="left"
              width={dimensions.width * 0.75}
              onChangeText={handleChange("comment_body")}
              value={values.comment_body}
              validateOnChange={false}
              validateOnBlur={false}
            />
            <IconButton
              ml="3"
              size="md"
              variant="ghost"
              alignSelf="flex-end"
              _icon={{
                as: Ionicons,
                name: "send",
                color: "#137950",
                size: "xl",
              }}
              onPress={() => handleSubmit()}
              isLoading={isSubmitting}
              isLoadingText="Đang tạo"
            />
          </HStack>
          <HStack alignContent="center" px="3">
            <IconButton
              ml="3"
              size="md"
              variant="ghost"
              alignSelf="flex-end"
              _icon={{
                as: EvilIcons,
                name: "image",
                color: "#137950",
                size: "xl",
              }}
              onPress={() => pickImage()}
            />
          </HStack>
        </FormControl>
      )}
    </Formik>
  );
}

export default React.memo(Create_comment);
