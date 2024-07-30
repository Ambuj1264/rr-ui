import React from "react";
import { Modal, Form } from "react-bootstrap";
import AddButton from "../common/addButton/AddButton";
import "react-datepicker/dist/react-datepicker.css";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRange } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import "dayjs/locale/en"; // Import the desired locale for dayjs

dayjs.locale("en"); // Set the locale for dayjs
interface EventModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (start: any) => void;
}

const EventAddModal: React.FC<EventModalProps> = ({ show, onHide, onSave }) => {
  const [value, setValue] = React.useState<any>(() => [
    dayjs("2023-10-17T15:30"),
    dayjs("2023-10-17T18:30"),
  ]);

  const handleInputChange = (newValue: DateRange<Dayjs>) => {
    setValue(newValue);
  };

  const handleSave = () => {
    onSave(value);
  };

  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header className="border-bottom-0" closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "SingleInputTimeRangeField",
                "SingleInputTimeRangeField",
              ]}
            >
              <SingleInputTimeRangeField
                label="Pick time"
                name="timePicker"
                value={value}
                onChange={(e: any) => handleInputChange(e)}
                defaultValue={[
                  dayjs("2023-10-17T15:30"),
                  dayjs("2023-10-17T18:30"),
                ]}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="border-top-0 d-flex justify-content-center">
        <AddButton
          type="button"
          className="btn btn_primary btn_about"
          onClick={handleSave}
        >
          Save
        </AddButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EventAddModal;
