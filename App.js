import { useState, useEffect, memo } from "react";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";


import {
  NativeBaseProvider,
  Box,
  useDisclose,
  Button,
  extendTheme,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import Search_bar from "./src/view/main/page/component/post/personal_home_toolbar/search_bar";
import Top_bar from "./src/view/main/page/component/menu/top_bar";
import Main from "./src/view/main/main";
import Login from "./src/view/log/login";
import SignIn from "./src/view/log/signin";
import Create_post from "./src/view/main/page/component/post/create_post/create_post";
import Comment from "./src/view/main/page/component/comment/comment_main";
import PersonalHome from "./src/view/main/page/personal_home";
import Single_post_full_view from "./src/view/main/page/component/post/single_post/single_post_full_view";
import Single_post_img_view from "./src/view/main/page/component/post/single_post/single_post_img_view";
import Share_post from "./src/view/main/page/component/post/single_post/sub_component/share_page/share_post";

import Setting from "./src/view/main/page/component/menu/setting";
import AvatarSetting from "./src/view/main/page/component/menu/avatar_setting";
import Information from "./src/view/main/page/component/menu/edit_info/information";
import Password from "./src/view/main/page/component/menu/edit_info/password";

import Avatar_edit from "./src/view/main/page/component/menu/avatar_background_edit/avatar_edit";
import Background_edit from "./src/view/main/page/component/menu/avatar_background_edit/background_edit";

import Img_preview from "./src/view/main/page/component/comment/single_comment/img_preview";

import Search_page from "./src/view/main/page/search_page";
function App() {
  const [logined, setLogin] = useState(false);
  const Stack = createStackNavigator();

  const [info, setInfo] = useState([]);
  const [email_login, setEmailLogin] = useState("");
  const [code_login, setCodeLogin] = useState("");

  const { isOpen, onOpen, onClose } = useDisclose();
  const [share_post_id, setSharePost] = useState(0);

  

  //console.log("info: " + JSON.stringify(info));

  const viewPage = () => {
    if (logined) {
      return (
        <NavigationContainer>
          <Share_post
            isOpenShare={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            emailS={email_login}
            codeS={code_login}
            share_post_id={share_post_id}
          />
          <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
            <Stack.Screen
              name="Main"
              children={({ navigation }) => (
                <Main
                  this_user_id={info?.id}
                  codeS={code_login}
                  emailS={email_login}
                  navigation={navigation}
                ></Main>
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comment_page"
              //component={Comment}
              children={(props) => (
                <Comment
                  route_params={props.route.params}
                  codeS={code_login}
                  emailS={email_login}
                  this_user_id={info?.id}
                ></Comment>
              )}
              options={{
                gestureEnabled: false,
                headerShown: false,
                cardOverlayEnabled: true,
                cardShadowEnabled: true,
                gestureDirection: "vertical",
                presentation: "modal",
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
              }}
            />
            <Stack.Screen
              name="Create_post"
              children={(props) => (
                <Create_post
                  route_params={props.route.params}
                  codeS={code_login}
                  emailS={email_login}
                ></Create_post>
              )}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerTransparent: true,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />

            <Stack.Screen
              name="Personal_home"
              children={(props) => (
                <PersonalHome
                  codeS={code_login}
                  emailS={email_login}
                  info={info}
                  this_user_id={info?.id}
                  route_params={props.route.params}
                ></PersonalHome>
              )}
              options={{
                headerTitle: () => <Search_bar />,
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="Single_post_full_view"
              children={(props) => (
                <Single_post_full_view
                  codeS={code_login}
                  emailS={email_login}
                  info={info}
                  this_user_id={info?.id}
                  setSharePost={setSharePost}
                  onOpen={onOpen}
                  onClose={onClose}
                  route_params={props.route.params}
                ></Single_post_full_view>
              )}
              options={{
                headerTitle: "Bài viết",
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.DefaultTransition,
              }}
            />

            <Stack.Screen
              name="Single_post_img_view"
              children={(props) => (
                <Single_post_img_view
                  codeS={code_login}
                  emailS={email_login}
                  info={info}
                  setSharePost={setSharePost}
                  onOpen={onOpen}
                  onClose={onClose}
                  route_params={props.route.params}
                ></Single_post_img_view>
              )}
              options={{
                headerTitle: "Bài viết img",
                headerShown: false,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.DefaultAnimation,
              }}
            />

            <Stack.Screen
              name="Share_post"
              children={(props) => (
                <Share_post
                  codeS={code_login}
                  emailS={email_login}
                  this_user_id={info?.id}
                  route_params={props.route.params}
                ></Share_post>
              )}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                gestureDirection: "vertical",
                detachPreviousScreen: false,
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS_half,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
              }}
            />

            <Stack.Screen
              name="Setting"
              children={(props) => (
                <Setting
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                ></Setting>
              )}
              options={{
                headerTitle: () => <Top_bar title="Cài đặt cá nhân" />,
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            {/*edit avatar */}
            <Stack.Screen
              name="AvatarSetting"
              children={(props) => (
                <AvatarSetting
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                ></AvatarSetting>
              )}
              options={{
                headerTitle: () => <Top_bar title="Chỉnh sửa ảnh" />,
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="AvatarEdit"
              children={(props) => (
                <Avatar_edit
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                  this_user_id={info?.id}
                ></Avatar_edit>
              )}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="BackgroundEdit"
              children={(props) => (
                <Background_edit
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                  this_user_id={info?.id}
                ></Background_edit>
              )}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            {/*edit info */}
            <Stack.Screen
              name="Information"
              children={(props) => (
                <Information
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                  info={info}
                ></Information>
              )}
              options={{
                headerTitle: () => <Top_bar title="Thay đổi thông tin" />,
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="EditPassword"
              children={(props) => (
                <Password
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                  info={info}
                ></Password>
              )}
              options={{
                headerTitle: () => <Top_bar title="Thay đổi mật khẩu" />,
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="CommentImgPreview"
              children={(props) => (
                <Img_preview
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                ></Img_preview>
              )}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="Search_page"
              children={(props) => (
                <Search_page
                  codeS={code_login}
                  emailS={email_login}
                  this_user_id={info?.id}
                  route_params={props.route.params}
                ></Search_page>
              )}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />

            <Stack.Screen
              name="Test"
              children={(props) => (
                <Test
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                ></Test>
              )}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                gestureDirection: "vertical",
                detachPreviousScreen: false,
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              children={() => (
                <Login
                  codeS={code_login}
                  setLogin={setLogin}
                  codeChange={setCodeLogin}
                  emailChange={setEmailLogin}
                  logined={logined}
                  setInfo={setInfo}
                ></Login>
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sign in"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Box flex="1" mt="0">
        {viewPage()}
      </Box>
    </NativeBaseProvider>
  );
}

export default memo(App);
