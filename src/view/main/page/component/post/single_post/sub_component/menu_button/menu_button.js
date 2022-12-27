import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  Popover,
  Button,
  Modal,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import link from "../../../../../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import ToastAlert from "../../../../alert";

function Menu_button(props) {
  const [isOpen_Menu, setIsOpen_Menu] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const toast = useToast();

  //console.log(props);

  const deleteFunction = () => {
    fetch(
      link.server_link +
        "controller/post/delete.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          emailS: props.emailS,
          codeS: props.codeS,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        if (data?.code === "POST_DELETE_OK") {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title="Xóa bài thành công"
                  variant="solid"
                  description="Bài viết đã bị xóa"
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
                  title="Xóa bài thất bại"
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
                title="Xóa bài thất bại"
                variant="solid"
                description={"Error: " + error + ". Vui lòng thử lại."}
                isClosable={true}
              />
            );
          },
        });
      });
  };

  return (
    <Box>
      <Menu
        w="100"
        defaultIsOpen={false}
        trigger={(triggerProps) => {
          return (
            <IconButton
              {...triggerProps}
              size="md"
              mt="0"
              variant="ghost"
              alignSelf="flex-end"
              _icon={{
                as: MaterialIcons,
                name: "menu",
                color: "#137950",
              }}
            />
          );
        }}
      >
        {props.author_id === props.user_id && (
          <Menu.Item
            onPress={() =>
              props.navigation.navigate("Create_post", {
                post_id: props.id,
                old_post_body: props.old_post_body,
                edit: 1,
                post_state: props.post_state,
              })
            }
          >
            Sửa bài
          </Menu.Item>
        )}
        {props.author_id === props.user_id && (
          <Menu.Item onPress={() => setIsOpenDelete(true)}>Xóa bài</Menu.Item>
        )}

        {props.author_id != props.user_id && (
          <Menu.Item>Không quan tâm</Menu.Item>
        )}
      </Menu>
      <Modal
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Xóa bài viết</Modal.Header>
          <Modal.Body>Bạn có chắc chắn không?</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setIsOpenDelete(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  await deleteFunction();
                  setIsOpenDelete(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

export default React.memo(Menu_button);
