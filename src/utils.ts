import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Data } from "./types";

dayjs.extend(isSameOrAfter);

export const getDataFromBirthday = (birthday: Dayjs | null): Data => {
  if (birthday === null || !birthday.isValid() || dayjs().isBefore(birthday)) {
    throw new Error("Invalid birthday");
  }

  const now = dayjs();
  const currentYear = now.get("year");
  const birthdayYear = birthday.get("year");
  const template = "YYYY.MM.DD.";

  /** korean age */
  const koreanAge = currentYear - birthdayYear + 1;

  /** american age */
  // birthday의 년도를 현재 년도로 바꾼다.
  const birthdayWithCurrentYear = birthday.set("year", currentYear);

  // 생일이 지났는지 확인한다.
  const isBirthdayPassed = now.isSameOrAfter(birthdayWithCurrentYear, "date");

  // 현재 년도에서 생일 년도를 뺀다.
  let americanAge = currentYear - birthdayYear;

  // 생일이 지나지 않았다면 1을 추가로 뺀다.
  if (!isBirthdayPassed) {
    americanAge -= 1;
  }

  /** diff */
  const diff = koreanAge - americanAge;

  /** formattedBirthday */
  const formattedBirthday = birthday.format(template);

  /** formattedToday */
  const formattedToday = now.format(template);

  return {
    koreanAge,
    americanAge,
    diff,
    formattedBirthday,
    formattedToday,
  };
};
