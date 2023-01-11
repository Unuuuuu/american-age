import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { FormEventHandler, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { css } from "@emotion/react";
import Collapse from "@mui/material/Collapse";
import getWesternAgeFromBirthday from "./utils";

const appCss = {
  container: css({
    height: "100%",
    paddingTop: "128px",
    paddingBottom: "128px",
  }),
};

type BirthdayType = Dayjs | null;

const App = () => {
  const [birthday, setBirthday] = useState<BirthdayType>(null);
  const [westernAge, setWesternAge] = useState<number | null>(null);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);

  const handleDatePickerChange = (newBirthday: BirthdayType) => {
    setBirthday(newBirthday);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // 값이 유효하지 않다면 error snackbar를 띄운다.
    if (
      birthday === null ||
      !birthday.isValid() ||
      dayjs().isBefore(birthday)
    ) {
      setIsErrorSnackbarOpen(true);
      return;
    }

    // 만 나이를 계산한다.
    const westernAgeFromBirthday = getWesternAgeFromBirthday(birthday);

    // 계산된 만 나이로 업데이트한다.
    setWesternAge(westernAgeFromBirthday);
    setIsErrorSnackbarOpen(false);
  };

  const handleErrorSnackbarClose: SnackbarProps["onClose"] = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsErrorSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs" css={appCss.container}>
      <Typography variant="h4" component="h1" align="center">
        만 나이 계산기
      </Typography>
      <Typography paragraph align="center">
        몇 살이 줄었는지 확인해보세요.
      </Typography>
      <Stack spacing={2}>
        <Collapse in={westernAge !== null}>
          <Alert severity="success">{`만 ${westernAge}세입니다.`}</Alert>
        </Collapse>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <DatePicker
              label="생년월일"
              value={birthday}
              onChange={handleDatePickerChange}
              renderInput={(params) => (
                <TextField {...params} variant="filled" />
              )}
            />
            <Button variant="contained" disableElevation type="submit">
              계산하기
            </Button>
          </Stack>
        </form>
      </Stack>
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">유효하지 않은 생년월일입니다.</Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
