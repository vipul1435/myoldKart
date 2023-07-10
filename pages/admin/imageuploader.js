import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

function imageuploader() {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <div>imageuploader</div>
      </FullLayout>
    </ ThemeProvider>
  )
}
export default imageuploader