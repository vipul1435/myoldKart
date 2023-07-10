import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from '@mui/material';
import ProductPerfomance from '@/src/components/dashboard/ProductPerfomance';
import hide from '@/styles/foolterHide';
function viewproduct() {
  return (
    <ThemeProvider theme={theme}>
      {hide}
      <FullLayout>
      <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance />
      </Grid>
    </Grid>
      </FullLayout>
    </ ThemeProvider>
  )
}
export default viewproduct