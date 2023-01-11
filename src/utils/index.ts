import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const getAmericanAgeFromBirthday = (birthday: Dayjs) => {
  const currentYear = dayjs().get("year");
  const birthdayYear = birthday.get("year");

  // birthday의 년도를 현재 년도로 바꾼다.
  const birthdayWithCurrentYear = birthday.set("year", currentYear);

  // 생일이 지났는지 확인한다.
  const isBirthdayPassed = dayjs().isSameOrAfter(
    birthdayWithCurrentYear,
    "date"
  );

  // 현재 년도에서 생일 년도를 뺀다.
  let americanAge = currentYear - birthdayYear;
  // 생일이 지나지 않았다면 1을 추가로 뺀다.
  if (!isBirthdayPassed) {
    americanAge -= 1;
  }

  return americanAge;
};

export default getAmericanAgeFromBirthday;
