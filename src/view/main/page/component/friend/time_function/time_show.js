import { Text } from "native-base";

import { memo } from "react";

function Time_show({ time_distance_5, time_modified }) {
  var modified_text = "";
  //console.log(time_distance);
  time_distance = Math.round(time_distance_5) * 5;
  if (time_modified > 0) {
    modified_text = " (Đã chỉnh sửa) ";
  }
  if (time_distance <= 1) {
    return <Text>{"1p" + modified_text}</Text>;
  } else if (1 < time_distance && time_distance < 60) {
    return <Text>{time_distance + "phút" + modified_text}</Text>;
  } else if (60 <= time_distance && time_distance < 1440) {
    return (
      <Text>{Math.round(time_distance / 60) + " giờ" + modified_text}</Text>
    );
  } else if (1440 <= time_distance && time_distance < 43200) {
    return (
      <Text>
        {Math.round(time_distance / 1440) + " ngày trước" + modified_text}
      </Text>
    );
  } else if (43200 <= time_distance && time_distance < 525600) {
    return (
      <Text>
        {Math.round(time_distance / 43200) + " tháng trước" + modified_text}
      </Text>
    );
  } else if (525600 <= time_distance) {
    return (
      <Text>
        {Math.round(time_distance / 525600) + " năm trước" + modified_text}
      </Text>
    );
  }
}
export default memo(Time_show);
