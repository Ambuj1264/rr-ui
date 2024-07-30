import * as Yup from "yup";

export const reservationSchema = Yup.object().shape({
  address: Yup.string()
    .max(300, "Only 300 characters are allowed")
    .required("Address is required"),
  city: Yup.string()
    .max(80, "Only 40 characters are allowed")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "No extra spaces are allowed")
    .required("City is required"),
  zipCode: Yup.string()
    .max(15, "Are you sure you entered your zip code correctly?")
    .matches(/^(?!(.* ){2}).*$/, "No extra spaces are allowed")
    .required("ZIP Code is required"),
  name: Yup.string()
    .max(40, "Are you sure you entered your name correctly?")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "No extra spaces are allowed")
    .required("Name of Person Reserving is required"),
  phoneNumber: Yup.string()
    .max(15, "Are you sure you entered your number correctly?")
    .matches(/^\+\d{1,4}\d{6,14}$/, 'Invalid phone number format')
    .required("Phone Number is required"),
  email: Yup.string()
    .max(150, "Are you sure you entered your email correctly?")
    .matches(/^(?!(.* ){2}).*$/, "No extra spaces are allowed")
    .email("This email address is not valid?")
    .required("Email Address is required"),
  notes: Yup.string(),
  startTime: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid start time format (HH:MM)"
    )
    .required("Start Time is required"),
    endTime: Yup.string()
    .test('endTime', 'End reservation time must be later than start time', function(value) {
      const { startTime } = this.parent;
      if (startTime && value) {
        const startTimeAsDate = new Date(`2023-01-01T${startTime}`);
        const endTimeAsDate = new Date(`2023-01-01T${value}`);
        return endTimeAsDate > startTimeAsDate;
      }
      return true;
    })
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid end time format (HH:MM)"
    )
    .required("End Time is required"),
  reservationDate: Yup.date()
   
    .required("Reservation date is required"),
});
