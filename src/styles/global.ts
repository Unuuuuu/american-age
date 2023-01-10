import { css } from "@emotion/react";

const globalCss = css`
  * {
    font-family: inherit;
  }
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  #root {
    position: absolute;
    inset: 0px;
  }
`;

export default globalCss;
