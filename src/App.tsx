import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { FormEventHandler, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { css } from "@emotion/react";
import Grow from "@mui/material/Grow";
import { getAgeFromBirthday } from "./utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AgeType } from "./types";

const appCss = {
  container: css({
    height: "100%",
    paddingTop: "16px",
    paddingBottom: "16px",
    overflowY: "auto",
  }),
  titleContainer: css({
    marginTop: "32px",
    marginBottom: "32px",
  }),
};

const App = () => {
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<AgeType | null>(null);

  const handleDatePickerChange = (newBirthday: Dayjs | null) => {
    setBirthday(newBirthday);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const ageFromBirthday = getAgeFromBirthday(birthday);

    if (ageFromBirthday === null) {
      // 유효하지 않은 birthday인 경우에 대해서는 이미 helperText ui가 표시되고 있기 때문에 아무것도 하지 않는다.
      return;
    }

    setAge(ageFromBirthday);
  };

  return (
    <Container maxWidth="xs" css={appCss.container}>
      <Alert severity="info">
        만 나이 통일은 2023년 6월 28일부터 시행됩니다.
      </Alert>
      <div css={appCss.titleContainer}>
        <Typography variant="h4" component="h1" align="center">
          만 나이 계산기
        </Typography>
        <Typography paragraph align="center">
          몇 살이 줄었는지 확인해보세요.
        </Typography>
      </div>
      <Stack spacing={2}>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <DatePicker
              label="생년월일"
              value={birthday}
              onChange={handleDatePickerChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  helperText={params.error ? "잘못된 생년월일입니다." : ""}
                />
              )}
              disableFuture
              openTo="year"
              views={["year", "month", "day"]}
              maxDate={dayjs()}
            />
            <Button variant="contained" disableElevation type="submit">
              계산하기
            </Button>
          </Stack>
        </form>
        <Grow in={age !== null}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.secondary" variant="caption">
                한국식 나이
              </Typography>
              <Typography>{age?.koreanAge}세</Typography>
              <Typography color="text.secondary" variant="caption">
                만 나이
              </Typography>
              <Typography>{age?.americanAge}세</Typography>
            </CardContent>
          </Card>
        </Grow>
      </Stack>
    </Container>
  );
};

export default App;
