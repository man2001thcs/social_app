import { Button } from "native-base";
import { memo } from "react";

//function that show the change of time
function Time_show({ time_distance_5, time_modified, color }) {
  const time_distance = time_distance_5 * 5;
  var modified_text = "";
  //console.log(color);
  if (time_modified > 0) {
    modified_text = " (Đã chỉnh sửa) ";
  }
  if (time_distance <= 1) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: color,
          fontSize: 13,
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
          color: color,
          fontSize: 13,
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
          color: color,
          fontSize: 13,
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
          color: color,
          fontSize: 13,
        }}
      >
        {Math.round(time_distance / 1440) + " ngày" + modified_text}
      </Button>
    );
  } else if (43200 <= time_distance && time_distance < 525600) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: color,
          fontSize: 13,
        }}
      >
        {Math.round(time_distance / 43200) + " tháng" + modified_text}
      </Button>
    );
  } else if (525600 <= time_distance) {
    return (
      <Button
        variant="ghost"
        _text={{
          fontWeight: "bold",
          color: color,
          fontSize: 13,
        }}
      >
        {Math.round(time_distance / 525600) + " năm" + modified_text}
      </Button>
    );
  }
}
export default memo(Time_show);
