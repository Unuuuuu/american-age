import React, { FormEventHandler, useRef, useState } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grow from "@mui/material/Grow";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import html2canvas from "html2canvas";
import { ReactComponent as PartyPopperIcon } from "./assets/party-popper.svg";
import { Data } from "./types";
import { getDataFromBirthday } from "./utils";

const accordionSx: SxProps<Theme> = (theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
});

const App = () => {
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDatePickerChange = (newBirthday: Dayjs | null) => {
    setBirthday(newBirthday);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    try {
      const dataFromBirthday = getDataFromBirthday(birthday);
      setData(dataFromBirthday);
    } catch {
      // 유효하지 않은 birthday인 경우에 대해서는 이미 DatePicker component에서 처리되고 있기 때문에 아무 처리도 하지 않은 채 리턴한다.
      return;
    }
  };

  const handleSaveButtonClick = () => {
    if (targetRef.current === null) {
      return;
    }

    html2canvas(targetRef.current).then((canvas) => {
      const anchorElement = document.createElement("a");
      anchorElement.setAttribute("download", "man-nai.png");
      anchorElement.setAttribute("href", canvas.toDataURL());
      anchorElement.click();
    });
  };

  const handleShareButtonClick = () => {
    if (targetRef.current === null) {
      return;
    }

    html2canvas(targetRef.current).then((canvas) => {
      canvas.toBlob(async (blob) => {
        if (blob === null || typeof navigator.share === "undefined") {
          return;
        }

        try {
          await navigator.share({
            title: "만 나이 계산기",
            url: "https://www.man-nai.com",
            files: [new File([blob], "man-nai.png", { type: blob.type })],
          });
          console.log("성공");
        } catch (error) {
          console.log("실패", error);
        }
      });
    });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100%",
        paddingTop: "16px",
        paddingBottom: "16px",
        overflowY: "auto",
      }}
    >
      <Alert severity="info">2023년 6월 28일부터 만 나이로 통일됩니다.</Alert>
      <Box
        sx={{
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          만 나이 계산기
        </Typography>
        <Typography variant="body1" component="h2" align="center">
          몇 살이 줄었는지 확인해보세요.
        </Typography>
      </Box>
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
                  variant="outlined"
                  helperText={params.error ? "잘못된 생년월일입니다." : ""}
                />
              )}
              disableFuture
              openTo="year"
              views={["year", "month", "day"]}
              maxDate={dayjs()}
            />
            <Button variant="contained" type="submit" disableElevation>
              계산하기
            </Button>
          </Stack>
        </form>
        {data !== null && (
          <Grow in={data !== null}>
            <Stack spacing={2}>
              <Card variant="outlined">
                <Box ref={targetRef}>
                  <CardContent
                    sx={{ backgroundColor: "#fffde7", textAlign: "center" }}
                  >
                    <SvgIcon
                      component={PartyPopperIcon}
                      sx={{ fontSize: "64px", marginBottom: 2 }}
                    />
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      component="div"
                    >
                      {data.diff === 2
                        ? "생일이 지나지 않았기 때문에"
                        : "생일이 지났기 때문에"}
                    </Typography>
                    <Typography>
                      {data.diff === 2 ? "두" : "한"} 살이 줄었어요.
                    </Typography>
                  </CardContent>
                  <Divider />
                  <Stack direction="row" alignItems="center">
                    <Box sx={{ flex: 1, p: 2 }}>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        component="div"
                        align="center"
                      >
                        한국식 나이
                      </Typography>
                      <Typography align="center">{data.koreanAge}세</Typography>
                    </Box>
                    <ChevronRightRoundedIcon />
                    <Box sx={{ flex: 1, p: 2 }}>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        component="div"
                        align="center"
                      >
                        만 나이
                      </Typography>
                      <Typography align="center">
                        {data.americanAge}세
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Card>
              <Box>
                <SpeedDial
                  ariaLabel="SpeedDial"
                  direction="left"
                  icon={<SpeedDialIcon />}
                >
                  <SpeedDialAction
                    icon={<SaveIcon />}
                    tooltipTitle="이미지 저장"
                    onClick={handleSaveButtonClick}
                  />
                  {typeof navigator.share !== "undefined" && (
                    <SpeedDialAction
                      icon={<ShareIcon />}
                      tooltipTitle="이미지 공유"
                      onClick={handleShareButtonClick}
                    />
                  )}
                </SpeedDial>
              </Box>
            </Stack>
          </Grow>
        )}
        <Box>
          <Accordion disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography variant="body2">만 나이 계산하는 방법</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                현재 연도에서 출생 연도를 뺀 후 생일이 지났으면 그대로 사용하고,
                생일이 아직 안 지났으면 한 살을 빼줍니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography variant="body2">한국식 나이 계산하는 방법</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                현재 연도에서 출생 연도를 뺀 후 한 살을 더해줍니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>
    </Container>
  );
};

export default App;
