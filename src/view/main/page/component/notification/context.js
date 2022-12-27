import { Text } from "native-base";

import { memo } from "react";

function Context({ type }) {
  console.log("type: " + type);
 if (type === 0){
  return <Text>vừa tạo bài viết mới</Text>
 } else if (type === 1){
  return <Text>vừa bình luận vào bài viết của bạn</Text>
 } else if (type === 3){
  return <Text>vừa gửi lời mời kết bạn</Text>
 } else if (type === 5){
  return <Text>vừa chấp nhận lời mời kết bạn</Text>
 } else if (type === 6){
  return <Text>vừa từ chối lời mời kết bạn</Text>
 } else if (type === 11){
  return <Text>vừa thícn bài viết của bạn</Text>
 } else if (type === 12){
  return <Text>không thích  bài viết của bạn</Text>
 } else if (type === 13){
  return <Text>yêu thích bài viết của bạn</Text>
 } else if (type === 14){
  return <Text>giận dữ trước bài viết của bạn</Text>
 }
}
export default memo(Context);
