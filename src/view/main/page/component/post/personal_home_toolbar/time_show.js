import { Text } from "native-base";

import { memo } from "react";

function Time_show({ created }) {
  const date_created = new Date(created.replace(/-/g, "/"));
  const month = date_created.getMonth();
  const day = date_created.getDate();
  const year = date_created.getFullYear();
  const hour = date_created.getHours();
  const minute = date_created.getMinutes();

  const this_time = new Date();

  if (this_time.getFullYear() === year) {
    return (
      <Text>
        {day} tháng {month}
      </Text>
    );
  } else
    return (
      <Text>
        {day} tháng {month} năm {year}
      </Text>
    );
}
export default memo(Time_show);
