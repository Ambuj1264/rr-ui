import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, FormGroup, FormLabel } from "@mui/material";
import ItemTable from "./ItemTable";
import AddButton from "../../common/addButton/AddButton";
import { reservationSchema } from "../../util/validation";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  basicPackages,
  deluxeQuery,
  packagePriceQuery,
  superDeluxeQuery,
} from "../../hooks/query/packages";
import Loader from "../../util/loader";
import { reservationMutations } from "../../hooks/mutation/reservation";
import { errorToast, successToast } from "../../util/toaster";
import { findServicesQuery } from "../../hooks/query/servicesPage";
import { ThemeProvider } from "react-bootstrap";
import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });
const BookingForm = (props:any) => {

  const [packageData, setPackageData] = useState([]);
  const state = useSelector((val: any) => val.reservation.payload);
  const params = useParams();
  const { loading, data } = useQuery(findServicesQuery, {
    variables: {
      findServiceId: params?.id,
    },
  });
  const packageState = useSelector(
    (valuable: any) => valuable.packageReducer.payload
  );
  
  
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    serviceId: "",
  });

  useEffect(() => {
    setServiceData({
      serviceName: data?.FindService?.serviceName,
      serviceId: data?.FindService?.id,
    });
  }, [data?.FindService?.serviceName, data?.FindService?.id]);

  const navigate = useNavigate();

  const { loading: basicLoading, data: basicQueryData } = useQuery(
    basicPackages,
    {
      variables: { basicPackageId: params?.id },
    }
  );
  const { loading: deluxeLoading, data: deluxeQueryData } = useQuery(
    deluxeQuery,
    {
      variables: { deluxePackageId: params?.id },
    }
  );
  const { loading: superDeluxeLoading, data: superDeluxeQueryDatas } = useQuery(
    superDeluxeQuery,
    {
      variables: { superDeluxePackageId: params?.id },
    }
  );
  useEffect(() => {
    if (state.length < 1) {
      navigate(`/services/${params?.id}`);
    }
    
  }, [state, packageState, navigate, params?.id]);
  let c =superDeluxeQueryDatas &&  superDeluxeQueryDatas?.superDeluxePackage && superDeluxeQueryDatas?.superDeluxePackage?.map((v: any) => ({
    quantity: v.superDeluxeQuantity,
    itemName: v.itemName,
  }));
  let a =basicQueryData && basicQueryData?.basicPackage && basicQueryData?.basicPackage?.map((v: any) => ({
    quantity: v.basicQuantity,
    itemName: v.itemName,
  }));
  let b = deluxeQueryData && deluxeQueryData?.deluxePackage &&  deluxeQueryData?.deluxePackage?.map((v: any) => ({
    quantity: v.deluxeQuantity,
    itemName: v.itemName,
  }));

  useEffect(() => {
    if (packageState.length) {
      switch (packageState[0].package) {
        case "1":
          return setPackageData(basicQueryData);

        case "2":
          return setPackageData(deluxeQueryData);

        case "3":
          return setPackageData(superDeluxeQueryDatas);

        default:
          break;
      }
    }
  }, [basicQueryData, deluxeQueryData, superDeluxeQueryDatas, packageState]);

  let newDate = state[0]?.date;
  const [totalPrice, setTotalPrice] = useState("0");
  const [packageType, setPackageType] = useState("");
  const [myPackage, setMyPackages] = useState([]);
  const [packagePriceState, setPackagePriceState] = useState<any>({});
  useEffect(() => {
    newDate = state[0]?.date;
  }, []);
  const { loading: LoadingPrice, data: priceData } = useQuery(
    packagePriceQuery,
    {
      variables: {
        serviceId: params?.id,
      },
    }
  );
  useEffect(() => {
    setPackagePriceState(priceData);
    if (packageState[0]?.package === "1") {
      setTotalPrice(packagePriceState?.packageData?.basicPackagePrice);
      setMyPackages(a);
      setPackageType("BASIC");
    }
    if (packageState[0]?.package === "2") {
      setTotalPrice(packagePriceState?.packageData?.deluxePackagePrice);
      setMyPackages(b);
      setPackageType("DELUXE");
    }
    if (packageState[0]?.package === "3") {
      setTotalPrice(packagePriceState?.packageData?.superDeluxePackagePrice);
      setMyPackages(c);
      setPackageType("SUPER DELUXE");
    }
  }, [priceData, packageState, a, b, c, packageType]);
  const date = new Date(newDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const [reservationMutate] = useMutation(reservationMutations);
  const {
    values: valueData,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      address: "",
      city: "",
      zipCode: "",
      name: "",
      phoneNumber: "",
      email: "",
      notes: "",
      startTime: "00:00",
      endTime: "00:00",
      reservationDate: formattedDate,
      serviceName: serviceData?.serviceName,
      serviceId: serviceData?.serviceId,
      packages: myPackage,
      packagePrice: totalPrice,
      packageType: packageType,
    },

    validationSchema: reservationSchema,
    onSubmit: async (values: any, action: any) => {
      try {
        const result = await reservationMutate({
          variables: {
            input: {
              email: values.email,
              name: values.name,
              phoneNumber: values.phoneNumber,
              zipcode: values.zipCode,
              city: values.city,
              address: values.address,
              notes: values.notes,
              startTime: values.startTime,
              endTime: values.endTime,
              reservationDate: values.reservationDate,
              serviceName: serviceData?.serviceName,
              serviceId: serviceData?.serviceId,
              packages: myPackage,
              packagePrice: totalPrice,
              packageType: packageType,
            },
          },
        });
        if (result.data) {
          successToast("Your reservation is created");
          action.resetForm();
          navigate("/services");
        } else {
          errorToast("Something went wrong");
        }
      } catch (error) {
        errorToast("Something went wrong");
      }
    },
  });
  if (
    basicLoading ||
    deluxeLoading ||
    superDeluxeLoading ||
    loading ||
    LoadingPrice
  ) {
    return <Loader />;
  }
  function formatDate(date1: any) {
    const year1 = date1.getFullYear();
    const month1 = String(date1.getMonth() + 1).padStart(2, "0");
    const day1 = String(date1.getDate()).padStart(2, "0");
    return `${year1}-${month1}-${day1}`;
  }
  const spacehandler = (event:any) => {
    if (event.which === 32 && event.target.value === "") {
      event.preventDefault();
    }
  };
  
  return (
    <div className="booking-main-div">
      <form action="" onSubmit={handleSubmit}>
        <Grid container spacing={3} className="grid-input-field">
          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                Name of Person Reserving <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="John"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onKeyDown={spacehandler}
                value={valueData.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                Phone Number <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="phoneNumber"
                placeholder="+19953176600"
                fullWidth
                variant="standard"
                name="phoneNumber"
                onChange={handleChange}
                onKeyDown={spacehandler}
                value={valueData.phoneNumber}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                Email Address <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="email"
                name="email"
                placeholder="xyz@devtrust.biz"
                fullWidth
                onChange={handleChange}
                value={valueData.email}
                variant="standard"
                onKeyDown={spacehandler}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                City <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="city"
                name="city"
                placeholder="New Mexico"
                fullWidth
                variant="standard"
                value={valueData.city}
                onKeyDown={spacehandler}
                onChange={handleChange}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                ZIP Code <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="zipCode"
                name="zipCode"
                placeholder="31134"
                fullWidth
                variant="standard"
                value={valueData.zipCode}
                onKeyDown={spacehandler}
                onChange={handleChange}
                error={touched.zipCode && Boolean(errors.zipCode)}
                helperText={touched.zipCode && errors.zipCode}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                Address <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="address"
                name="address"
                fullWidth
                placeholder="4140 Parker Rd. Allentown,"
                variant="standard"
                value={valueData?.address}
                onChange={handleChange}
                onKeyDown={spacehandler}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                Start Reservation time <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="address"
                name="startTime"
                type="time"
                fullWidth
                variant="standard"
                value={valueData?.startTime}
                onChange={handleChange}
                error={touched.startTime && Boolean(errors.startTime)}
                helperText={touched.startTime && errors.startTime}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
                End Reservation time <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="address"
                name="endTime"
                type="time"
                fullWidth
                variant="standard"
                value={valueData?.endTime}
                onChange={handleChange}
                error={touched.endTime && Boolean(errors.endTime)}
                helperText={touched.endTime && errors.endTime}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} marginBottom={3}>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "3px" }}>
               Rerservation Date <span className="color-danger">*</span>
              </FormLabel>
              <TextField
                id="reservationDate"
                name="reservationDate"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true, // To make the label "shrink" when there's a value
                }}
                inputProps={{
                  min: formatDate(new Date()), // Use a function to format the date
                }}
                value={valueData?.reservationDate}
                onChange={handleChange}
                error={
                  touched.reservationDate && Boolean(errors.reservationDate)
                }
                helperText={touched.reservationDate && errors.reservationDate}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>
        </Grid>

        <div className="grid-info-item">
          <FormLabel sx={{ marginBottom: "1rem" }}>Package Items </FormLabel>
          <ItemTable packageData={packageData} />
        </div>
        <div className="grid-info-item">
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ marginLeft: "-24px" }}>
              <ThemeProvider theme={lightTheme}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    display: "grid",
                    gridTemplateColumns: { md: "1fr 1fr" },
                    gap: 2,
                    minWidth:"400px"
                  }}
                >
                  <Item sx={{ color: "#004225" }}>
                    <strong>
                      <span style={{ color: "#004225" , paddingRight:"19px" }}>Price : </span>{" "}
                      ${totalPrice} 
                    </strong>
                  </Item>
                </Box>
              </ThemeProvider>
            </Grid>
          </Grid>
        </div>
        <div className="grid-info-item">
          <Grid>
            <FormGroup>
              <FormLabel sx={{ marginBottom: "1rem" }}>Note</FormLabel>
              <TextField
                id="notes"
                name="notes"
                multiline
                sx={{ background: "#F6F6F6" }}
                rows={4}
                variant="standard"
                value={valueData.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={spacehandler}
              />
            </FormGroup>
          </Grid>
        </div>

        <div className="grid-info-item d-flex justify-content-center">
          <AddButton className="btn btn_primary btn_services" type="submit">
            Submit
          </AddButton>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
