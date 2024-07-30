import React, { useCallback, useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Loader from "../../util/loader";
import Icon from "../../images/about-icon.png";
import Dot from "../../images/dot-line.png";
import { useDispatch, useSelector } from "react-redux";
import {
  basicPackages,
  deluxeQuery,
  superDeluxeQuery,
} from "../../hooks/query/packages";
import { packageAction } from "../../redux/action";

const generateListItems = (items: any) => (
  <div>
    {items?.map((item: any, index: any) => (
      <div className="d-flex gap-3" key={index}>
        <div>
          <div className="d-flex">
            <span>
              <img src={item.icon} alt="img" />
            </span>
            <p  style={{ wordBreak: "break-all", paddingLeft: "1rem", width:'150px' }}>
              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </p>
          </div>
        </div>
      
        <div className="d-flex gap-3">
          <span>
            <img src={item?.middleIcon} alt="img" />
          </span>
          <p>{item?.pieces}</p>
        </div>
      </div>
    ))}
  </div>
);

const TabPackage = () => {
  const { id } = useParams();
  const [value, setValue] = useState("1");
  const [basicData, setBasicData] = useState([]);
  const [deluxeData, setDeluxeData] = useState([]);
  const [superDeluxeData, setSuperDeluxeData] = useState([]);
  const dispatch = useDispatch();

  const { loading: basicLoading, data: basicQueryData } = useQuery(
    basicPackages,
    {
      variables: { basicPackageId: id },
    }
  );
  const { loading: deluxeLoading, data: deluxeQueryData } = useQuery(
    deluxeQuery,
    {
      variables: { deluxePackageId: id },
    }
  );
  const { loading: superDeluxeLoading, data: superDeluxeQueryDatas } = useQuery(
    superDeluxeQuery,
    {
      variables: { superDeluxePackageId: id },
    }
  );

  // Use a ref to track whether the second useEffect should run
  const secondEffectRan = useRef(false);
  useEffect(() => {
    setBasicData(
      basicQueryData?.basicPackage?.map((item: any) => ({
        icon: Icon,
        title: item?.itemName,
        middleIcon: Dot,
        pieces: `${item?.basicQuantity} Pieces`,
      }))
    );
    setDeluxeData(
      deluxeQueryData?.deluxePackage?.map((item: any) => ({
        icon: Icon,
        title: item?.itemName,
        middleIcon: Dot,
        pieces: `${item?.deluxeQuantity} Pieces`,
      }))
    );
    setSuperDeluxeData(
      superDeluxeQueryDatas?.superDeluxePackage?.map((item: any) => ({
        icon: Icon,
        title: item?.itemName,
        middleIcon: Dot,
        pieces: `${item?.superDeluxeQuantity} Pieces`,
      }))
    );

    secondEffectRan.current = true;
  }, [basicQueryData, deluxeQueryData, superDeluxeQueryDatas]);

  const myCallback = useCallback(() => {
    if (secondEffectRan.current) {
      if (basicData && deluxeData && superDeluxeData) {
        setValue("1");
      } else if (!basicData && deluxeData && !superDeluxeData) {
        setValue("2");
      } else if (!basicData && !deluxeData && superDeluxeData) {
        setValue("3");
      } else if (basicData && !deluxeData && !superDeluxeData) {
        setValue("1");
      } else if (basicData && !deluxeData && !superDeluxeData) {
        setValue("1");
      } else if (!basicData && deluxeData && superDeluxeData) {
        setValue("2");
      }
      dispatch(packageAction([{ package: value }]));
    }
  }, [basicData, deluxeData, superDeluxeData]);

  useEffect(() => {
    myCallback();
  }, [myCallback, secondEffectRan, basicData, deluxeData, superDeluxeData]);

  if (basicLoading || deluxeLoading || superDeluxeLoading) {
    return <Loader />;
  }

  const handlerChange = (newValue: any) => {
    setValue(newValue);
    dispatch(packageAction([{ package: newValue }]));
  };

  return (
    <div className="mb-3">
      <div className="birthday_body you_get">
        <h4>Package</h4>
        <div
          style={{
            border: "1px solid #C4C4C4",
            borderRadius: "20px",
            marginBottom: "1rem",
          }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(e, newValue) => handlerChange(newValue)}
                  aria-label="lab API tabs example"
                >
                  {basicData ? (
                    <Tab className="tab-label" sx={{ width: "25%" }} label="Basic" value="1" />
                  ) : (
                    ""
                  )}
                  {deluxeData ? (
                    <Tab className="tab-label" sx={{ width: "25%" }} label="Deluxe" value="2" />
                  ) : (
                    ""
                  )}
                  {superDeluxeData ? (
                    <Tab className="tab-label" sx={{ width: "25%" }} label="Super Deluxe" value="3" />
                  ) : (
                    ""
                  )}
                </TabList>
              </Box>
              <TabPanel value="1">
                <Row>
                  <Col xl={6} lg={12} md={12} style={{
                    justifyContent: basicData && basicData?.length === 1 ? 'center' : '',
                    margin: basicData && basicData?.length === 1 ? 'auto' : '',
                    display: basicData && basicData?.length === 1 ? 'grid' : ''
                  }}
                  >
                    <div>
                      {generateListItems(basicData)}
                    </div>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel value="2">
                <Row>
                  <Col xl={6} lg={12} md={12} 
                  style={{
                    justifyContent: deluxeData && deluxeData?.length === 1 ? 'center' : '',
                    margin: deluxeData && deluxeData?.length === 1 ? 'auto' : '',
                    display: deluxeData && deluxeData?.length === 1 ? 'grid' : ''
                  }} className="mx-auto"
                  >
                    <div className="">
                      {generateListItems(deluxeData)}
                    </div>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel value="3">
                <Row style={{ justifyContent: 'end'}}>
                  <Col style={{
                    justifyContent: superDeluxeData && superDeluxeData?.length === 1 ? 'center' : '',
                    margin: superDeluxeData && superDeluxeData?.length === 1 ? 'auto' : '',
                    display: superDeluxeData && superDeluxeData?.length === 1 ? 'grid' : ''
                  }}
                  >
                    <div className="float-end">
                      {generateListItems(superDeluxeData)}
                    </div>
                  </Col>
                </Row>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <span className="note_text">
          *Click “Book Now” to customize your item list and reserve your items.
        </span>
      </div>
    </div>
  );
};

export default TabPackage;
