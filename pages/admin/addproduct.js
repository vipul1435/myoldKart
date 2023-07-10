import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from '@/src/components/baseCard/BaseCard';
import hide from '@/styles/foolterHide';
function addproduct() {
  const [form, setform] = useState({});
  const onchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };


  const submitForm = async (e) => {
    e.preventDefault();
    let data = {
      title: form.title,
      slug: form.slug,
      desc: form.desc,
      image: form.image,
      category: form.category,
      size: form.size,
      color: form.color,
      price: form.price,
      avilableQty: form.avilableQty,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let response = await res.json();
    if (response.success) {
      toast.success('Product added Successfully', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      {hide}
      <FullLayout>
      <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add a Product">
          <Stack spacing={3}>
            <TextField onChange={onchange} value={form.title? form.title:""} name='title' label="Title" variant="outlined" />
            <TextField onChange={onchange} value={form.slug ? form.slug:""} name='slug' label="Slug" variant="outlined" />
            <TextField onChange={onchange} value={form.color ? form.color:""} name='color' label="Color" variant="outlined" />
            <TextField onChange={onchange} value={form.size?form.size:""} name='size' label="Size" variant="outlined" />
            <TextField onChange={onchange} value={form.price?form.price:""} name='price' label="price" variant="outlined" />
            <TextField onChange={onchange} value={form.avilableQty?form.avilableQty:""} name='avilableQty' label="avilableQty" variant="outlined" />
            <TextField onChange={onchange} value={form.category?form.category:""} name='category' label="category" variant="outlined" />
            <TextField onChange={onchange} value={form.image?form.image:""} name='image' label="image" variant="outlined" />
            <TextField onChange={onchange} value={form.desc?form.desc:""}
              id="outlined-multiline-static"
              name='desc'
              label="description"
              multiline
              rows={3}
            />
          </Stack>
          <br />
          <Button onClick={submitForm} variant="outlined" mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>
    </Grid>
      </FullLayout>
    </ ThemeProvider>
  )
}

export default addproduct