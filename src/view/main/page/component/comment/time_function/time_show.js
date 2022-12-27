import { Button } from "native-base";
import { memo } from "react";

//function that show the change of time
function Time_show({ time_distance_5, time_modified }) {
  const time_distance = time_distance_5 * 5;
  var modified_text = "";
  //console.log(time_distance);
  if (time_modified > 0) {
    modified_text = " (Đã chỉnh sửa) ";
  }
  if (time_distance <= 1) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: "gray.700",
          fontSize: 15,
        }}
      >
        {"1p" + modified_text}
      </Button>
    );
  } else if (1 < time_distance && time_distance < 60) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: "gray.700",
          fontSize: 15,
        }}
      >
        {time_distance + "phút" + modified_text}
      </Button>
    );
  } else if (60 <= time_distance && time_distance < 1440) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: "gray.700",
          fontSize: 15,
        }}
      >
        {Math.round(time_distance / 60) + " giờ" + modified_text}
      </Button>
    );
  } else if (1440 <= time_distance && time_distance < 43200) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: "gray.700",
          fontSize: 15,
        }}
      >
        {Math.round(time_distance / 1440) + " ngày trước" + modified_text}
      </Button>
    );
  } else if (43200 <= time_distance && time_distance < 525600) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: "gray.700",
          fontSize: 15,
        }}
      >
        {Math.round(time_distance / 43200) + " tháng trước" + modified_text}
      </Button>
    );
  } else if (525600 <= time_distance) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: "gray.700",
          fontSize: 15,
        }}
      >
        {Math.round(time_distance / 525600) + " năm trước" + modified_text}
      </Button>
    );
  }
}
export default memo(Time_show);
