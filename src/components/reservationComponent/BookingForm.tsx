import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, FormGroup, FormLabel } from "@mui/material";
import ItemTable from "./ItemTable";
import AddButton from "../../common/addButton/AddButton";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import {
  basicPackages,
  deluxeQuery,
  packagePriceQuery,
  superDeluxeQuery,
} from "../../hooks/query/packages";
import Loader from "../../util/loader";
import { errorToast, successToast } from "../../util/toaster";
import { findServicesQuery } from "../../hooks/query/servicesPage";
import { ThemeProvider } from "react-bootstrap";
import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { reservationQueryForFormQuery } from "../../hooks/query/reservation";
import { reservationMutations } from "../../hooks/mutation/reservation";
import { findSlotQueryByStartDate } from "../../hooks/query/slot";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });
const BookingForm = (_props: any) => {
  const [packageData, setPackageData] = useState([]);
  const state = useSelector((val: any) => val.reservation.payload);
  const params = useParams();
  const [endTimeFromAPI, setEndTimeFromAPI] = useState('');
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
    if (state?.length < 1) {
      navigate(`/services/${params?.id}`);
    }
  }, [state?.length, packageState?.length, params?.id]);
  let c =
    superDeluxeQueryDatas &&
    superDeluxeQueryDatas?.superDeluxePackage &&
    superDeluxeQueryDatas?.superDeluxePackage?.map((v: any) => ({
      quantity: v.superDeluxeQuantity,
      itemName: v.itemName,
    }));
  let a =
    basicQueryData &&
    basicQueryData?.basicPackage &&
    basicQueryData?.basicPackage?.map((v: any) => ({
      quantity: v.basicQuantity,
      itemName: v.itemName,
    }));
  let b =
    deluxeQueryData &&
    deluxeQueryData?.deluxePackage &&
    deluxeQueryData?.deluxePackage?.map((v: any) => ({
      quantity: v.deluxeQuantity,
      itemName: v.itemName,
    }));
  useEffect(() => {
    if (packageState?.length) {
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
  }, [
    basicQueryData?.length,
    deluxeQueryData?.length,
    superDeluxeQueryDatas?.length,
    packageState?.length,
  ]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [packageType, setPackageType] = useState("");
  const [packagePriceState, setPackagePriceState] = useState<any>({});
  const [myPackage, setMyPackages] = useState([]);
  const [reservervationFormSingleForm, setReservervationFormSingleForm] =
    useState<any>({});

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
  }, [
    priceData,
    packageState?.length,
    a?.length,
    b?.length,
    c?.length,
    packageType,
    packagePriceState?.packageData?.id,
  ]);

  const { loading: reservationFormLoading, data: reservationFormData } =
    useQuery(reservationQueryForFormQuery, {
      variables: {
        serviceId: params?.id,
      },
    });
  if (reservationFormLoading) {
    <Loader />;
  }

  useEffect(() => {
    setReservervationFormSingleForm(reservationFormData);
  }, [
    reservervationFormSingleForm?.length,
    reservationFormData?.length,
    reservationFormData?.reservationFormSingleDataForUI?.id,
  ]);

  const spacehandler = (event: any) => {
    if (event.which === 32 && event.target.value === "") {
      event.preventDefault();
    }
  };
  let newDate = state[0]?.date;
  const date = new Date(newDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const initialValues: any = {};
  const { loading: startDateLoading, data: startDateData } = useQuery(
    findSlotQueryByStartDate,
    {
      variables: {
        startDate: formattedDate,
      },
    }
  );
  const validateStartTime = (startTimeFromAPI:any) =>
  Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid start time format (HH:MM)"
    )
    .test(
      "startTime",
      `Select time between ${startTimeFromAPI} to ${endTimeFromAPI}`,
      function (value) {
        const startTimeAsDate = new Date(`2023-01-01T${startTimeFromAPI}`);
        const endTimeApiDate = new Date(`2023-01-01T${endTimeFromAPI}`);
        const currentTimeAsDate = new Date(`2023-01-01T${value}`);
        return currentTimeAsDate >= startTimeAsDate && currentTimeAsDate <endTimeApiDate ;
      }
    )
    .required("Start Time is required");

const validateEndTime = (endTimeFromAPI:any, startTimeFromAPI:any) =>
  Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid end time format (HH:MM)"
    )
    .test(
      "endTime",
      `Select time between ${startTimeFromAPI} to ${endTimeFromAPI}`,
      function (value) {
        const startTimeAsDate = new Date(`2023-01-01T${startTimeFromAPI}`);
        const endTimeApiDate = new Date(`2023-01-01T${endTimeFromAPI}`);
        const endTimeAsDate = new Date(`2023-01-01T${value}`);
        return endTimeAsDate >= startTimeAsDate && endTimeAsDate <= endTimeApiDate;
      }
    )
    .test(
      "endTimeAfterApi",
      "End time must be later than or equal to the provided end time",
      function (value) {
              const { startTime } = this.parent;
              if (startTime && value) {
                const startTimeAsDate = new Date(`2023-01-01T${startTime}`);
                const endTimeAsDate = new Date(`2023-01-01T${value}`);
                return endTimeAsDate > startTimeAsDate;
              }
              return true;
            }
    )
    .required("End Time is required");
  const fieldss =
    reservervationFormSingleForm?.reservationFormSingleDataForUI?.fields || [];

  fieldss.map((field: any) =>  {
    initialValues[`${field?.label}`] = ""
  } )
  initialValues["name"] = "";
  initialValues["email"] = "";
  initialValues["phoneNumber"] = "";
  initialValues["zipCode"] = "";
  initialValues["address"] = "";
  initialValues["city"] = "";
  initialValues["startTime"] = startDateData?.findSlotByDate?.startTime;
  initialValues["endTime"] = startDateData?.findSlotByDate?.endTime;
  initialValues["reservationDate"] = formattedDate;
  const generateValidationSchema = (fields: any) => {
    const fieldValidations: any = {};

    fields.forEach((field: any) => {
      const { label, required } = field;
      if (required) {
        fieldValidations[label] = Yup.string().required(
          "This field is required"
        );
      }
    });

    // Add static fields with string validation
    fieldValidations["name"] = Yup.string().required("This field is required");
    fieldValidations["email"] = Yup.string()
      .email("Invalid email")
      .required("This field is required");
    fieldValidations["phoneNumber"] = Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("This field is required");
    fieldValidations["zipCode"] = Yup.string()
      .max(15, "Invailid zipcode")
      .required("This field is required");
    fieldValidations["address"] = Yup.string().required(
      "This field is required"
    );
    const startTimeFromAPI = startDateData?.findSlotByDate?.startTime;
    const endTimeFromAPI = startDateData?.findSlotByDate?.endTime;
    fieldValidations.startTime = validateStartTime(startTimeFromAPI);
    fieldValidations.endTime = validateEndTime(endTimeFromAPI, startTimeFromAPI);
    fieldValidations["city"] = Yup.string().required("This field is required");

    return Yup.object().shape(fieldValidations);
  };

  const [resevationMutate, { loading: reservationMutateLoading }] =
    useMutation(reservationMutations);
  const {
    values: valueData,
    errors,
    touched,
    handleBlur, // Add handleBlur from useFormik
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: generateValidationSchema(fieldss),
    onSubmit: async (values, action) => {
      try {
        const result = await resevationMutate({
          variables: {
            input: {
              packagePrice: totalPrice,
              packageType: packageType,
              packages: myPackage,
              reservationForm: values,
              serviceName: serviceData?.serviceName,
              serviceId: serviceData?.serviceId,
            },
          },
        });
        if (result?.data) {
          successToast("Reservation created");
          action.resetForm();
          navigate("/services");
        }
      } catch (error) {
        errorToast("Something went wrong");
      }
    },
  }) as any;
  useEffect(() => {
    if (startDateData?.findSlotByDate?.endTime) {
      setEndTimeFromAPI(startDateData?.findSlotByDate?.endTime);
    }
  }, [startDateData?.findSlotByDate?.endTime]);

  if (
    basicLoading ||
    deluxeLoading ||
    superDeluxeLoading ||
    loading ||
    LoadingPrice ||
    reservationMutateLoading ||
    startDateLoading
  ) {
    return <Loader />;
  }

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
                fullWidth
                variant="standard"
                onChange={handleChange}
                onKeyDown={spacehandler}
                value={valueData.name}
                error={Boolean(errors.name)}
                helperText={
                  errors.name
                }
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
                fullWidth
                variant="standard"
                name="phoneNumber"
                onChange={handleChange}
                onKeyDown={spacehandler}
                value={valueData.phoneNumber}
                error={Boolean(errors.phoneNumber)}
                helperText={
                  errors.phoneNumber
                }
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
                fullWidth
                onChange={handleChange}
                value={valueData.email}
                variant="standard"
                onKeyDown={spacehandler}
                error={Boolean(errors.email)}
                helperText={
                  errors.email
                }
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
                fullWidth
                variant="standard"
                value={valueData.city}
                onKeyDown={spacehandler}
                onChange={handleChange}
                error={ Boolean(errors.city)}
                helperText={
                  errors?.city
                }
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
                fullWidth
                variant="standard"
                value={valueData.zipCode}
                onKeyDown={spacehandler}
                onChange={handleChange}
                error={Boolean(errors.zipCode)}
                helperText={
                  errors?.zipCode
                }
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
                variant="standard"
                value={valueData?.address}
                onChange={handleChange}
                onKeyDown={spacehandler}
                error={ Boolean(errors.address)}
                helperText={ errors.address}
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
                disabled
                variant="standard"
                InputLabelProps={{
                  shrink: true, // To make the label "shrink" when there's a value
                }}
                inputProps={{
                  min: formattedDate, // Use a function to format the date
                }}
                value={formattedDate}
                onChange={handleChange}
                error={
                  Boolean(errors.reservationDate)
                }
                helperText={
                  errors.reservationDate
                }
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
                InputLabelProps={{
                  shrink: true, // To make the label "shrink" when there's a value
                }}
                inputProps={{
                  min: startDateData?.findSlotByDate?.startTime, // Use a function to format the date
                }}
                value={valueData?.startTime}
                onChange={handleChange}
                error={ Boolean(errors.startTime)}
                helperText={ errors.startTime}
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
                error={ Boolean(errors.endTime)}
                helperText={ errors.endTime}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Grid>

          {reservervationFormSingleForm?.reservationFormSingleDataForUI?.fields?.map((field: any, index: any) => {
 const fieldName = field?.label;
 const isError =  errors[fieldName];
 const helpValue= valueData[fieldName]?.length<=1 ? true : false
 const helperText =  errors[fieldName];
  return (
    <Grid item xs={12} sm={6} key={index}>
      <FormGroup>
        <FormLabel sx={{ marginBottom: "3px" }}>
          {field?.label}{" "}
          <span className="color-danger">
            {field?.required ? "*" : ""}
          </span>
        </FormLabel>
        <TextField
          id={fieldName}
          name={fieldName}
          fullWidth
          variant="standard"
          onKeyDown={spacehandler}
          onChange={handleChange}
          onBlur={handleBlur}
          value={valueData[fieldName]}
          error={isError}
          helperText={helperText}
        />
      </FormGroup>
    </Grid>
  );
})}

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
                    minWidth: "400px",
                  }}
                >
                  <Item sx={{ color: "#004225" }}>
                    <strong>
                      <span style={{ color: "#004225", paddingRight: "19px" }}>
                        Price :{" "}
                      </span>{" "}
                      $ {totalPrice}
                    </strong>
                  </Item>
                </Box>
              </ThemeProvider>
            </Grid>
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
