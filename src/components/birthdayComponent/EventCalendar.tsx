import React, { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddButton from "../../common/addButton/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { calenderAction } from "../../redux/action";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast } from "../../util/toaster";
import { useQuery } from "@apollo/client";
import {
  basicPackages,
  deluxeQuery,
  superDeluxeQuery,
} from "../../hooks/query/packages";
import Loader from "../../util/loader";
import "./EventCalendar.css"; // Import your CSS file
import { Grid } from "@mui/material";
import { findSlotQueryByStartDate } from "../../hooks/query/slot";

const EventCalendar: React.FC = () => {
  const [slot, setSlot]= useState({})
  const calendarRef :any= React.createRef<FullCalendar>();
  const [allQueryData, setAllQueryData] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((res: any) => res?.reservation);
  const navigate = useNavigate();
  const params = useParams();
  let newDate = state?.payload[0]?.date
  const date = new Date(newDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const { loading: startDateLoading, data: startDateData } = useQuery(
    findSlotQueryByStartDate,
    {
      variables: {
        startDate: formattedDate,
      },
    }
  );
  useEffect(()=>{
    setSlot(startDateData?.findSlotByDate)
  },[startDateData])
  const handleSubmit = () => {

    if (state?.payload?.length < 1) {
      errorToast("Please select the date");
    }else if(!slot?.hasOwnProperty('id')){
      errorToast("No reservation for this date");
    }
    else {
      navigate(`/reservation/${params?.id}`);
    }
  };
  const {
    loading: basicLoading,
    data: basicQueryData,
    refetch: basicRefectch,
  } = useQuery(basicPackages, {
    variables: { basicPackageId: params?.id },
  });

  const {
    loading: deluxeLoading,
    data: deluxeQueryData,
    refetch: deluxeRefetch,
  } = useQuery(deluxeQuery, {
    variables: { deluxePackageId: params?.id },
  });

  const {
    loading: superDeluxeLoading,
    data: superDeluxeQueryDatas,
    refetch: superDeluxeRefetch,
  } = useQuery(superDeluxeQuery, {
    variables: { superDeluxePackageId: params?.id },
  });

  const myCallback = useCallback(async () => {
    const data1 = await basicQueryData?.basicPackage;
    const data2 = await deluxeQueryData?.deluxePackage;
    const data3 = await superDeluxeQueryDatas?.superDeluxePackage;

    if (data1 || data2 || data3) {
      setAllQueryData(false);
    } else if (!data1 && !data2 && !data3) {
      setAllQueryData(true);
    }
  }, [basicQueryData, deluxeQueryData, superDeluxeQueryDatas]);
  useEffect(()=>{
    dispatch(calenderAction([]));
  },[])
  useEffect(() => {
    deluxeRefetch();
    superDeluxeRefetch();
    basicRefectch();
    myCallback();
  }, [myCallback, deluxeRefetch, superDeluxeRefetch, basicRefectch]);


  if (basicLoading || deluxeLoading || superDeluxeLoading
     ) {
    return <Loader />;
  }
 
  const dateClick = (info: any) => {
    const selectedDateStr = info?.dateStr;
    const calendarApi = calendarRef.current?.getApi();
    const selectedEventId = "selectedEvent";
    const selectedEvent = calendarApi.getEventById(selectedEventId);
  
    if (selectedEvent) {
      selectedEvent.remove(); // Remove the previously selected event
    }
  
    const newEvent = {
      id: selectedEventId,
      title: "Selected",
      start: info.dateStr,
      selectedDate: true, // Your custom property
      backgroundColor: "green",
      color:"white"
    };
  
    calendarApi.addEvent(newEvent);
  
    dispatch(calenderAction([{ date: selectedDateStr }]));
  };

  return (
    <Grid sx={{width:"80%", alignItems:"center",margin:"auto", py:5}}>
    <div className="mb-5" >
      <>
        <FullCalendar 
          ref={calendarRef}
          plugins={[
            // timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            // listPlugin,
          ]}
          headerToolbar={{
            left: "title",
            center: "",
          }}
          initialView="dayGridMonth"
          // editable={true}
          selectable={true}
          unselectAuto={true}
          // selectMirror={true}
          // dayMaxEvents={true}
          // select={handleEventSelect}
          dateClick= {dateClick}
          // eventContent={eventRender} // Use the custom event renderer
          events={[]}
    
          validRange={{
            start: new Date().toISOString().substring(0, 10),
          }}
        />
        {!allQueryData ? (
          <div className="d-flex justify-content-center w-100 mt-4">
            <AddButton
              className="btn btn_primary btn_about"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Book Now
            </AddButton>
          </div>
        ) : (
          ""
        )}
      </>
    </div>
    </Grid>
  );
};

export default EventCalendar;
