import React, { useContext, useState } from "react";
import Header from "../partials/Header";
import PMC from "../components/PMC";
import Three from "../components/Three";
import Wise from "../components/Wise";
import SSP from "../components/SSP";
import R1 from "../components/R1";
import R2 from "../components/R2";
import FM from "../components/FM";
import FME from "../components/FME";
import { AccountContext } from "../context/context";
import BottleNeck from "../components/BottleNeck";
import DC from "../components/DC";
import Delays from "../components/Delays";
import Gaps from "../components/Gaps";
import Processes from "../components/Processes";
import FRC from "../components/FRCDelay";
import BN from "../components/BN";
import GRT from "../components/GRT";
import WRT from "../components/WRT";
import LoadingG from "../components/LoadingG";
import Charging from "../components/Charging";
import PieceID from "../components/PieceID";
import Date from "../components/Date";
import ProcessTime from "../components/ProcessTime";
import { roundOff } from "../utils/roundoff";
import { Card, Typography } from "antd";

const { Text } = Typography;

const Live = () => {
  const handleChange = (e) => {
    setPeriod(e);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [pieceId, setPieceId] = useState(false);
  const [date, setDate] = useState(false);
  const { period, setPeriod, data, setMins, mins, rmBarThickness } =
    useContext(AccountContext);

  const getRM = () => {
    if (data?.RM) {
      if (period == "Last Coil" || period.customp) {
        return roundOff(data?.RM[0]?.f_R2StripThk);
      } else if (
        period == "Last 5 Coil" ||
        period == "Last Hour" ||
        period == "Last Shift" ||
        period == "Last Day" ||
        period?.date
      ) {
        console.log(data?.RM, "Rm");
        let total1 =
          data?.RM?.length > 1 &&
          data?.RM?.reduce((accumulator, currentValue) => {
            accumulator = accumulator + currentValue.f_R2StripThk;

            return accumulator;
          }, 0);
        return roundOff(Number(total1 / data?.RM.length));
      } else {
        return 0;
      }
    }
  };

  return (
    <div>
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className=" relative h-[90vh] bg-cover bg-no-repeat ">
          <img
            src="http://127.0.0.1:5000/video"
            className="absolute w-screen h-screen"
          />
          <div className="sticky top-[15%] px-4 flex gap-6  !text-xs justify-start ml-14">
            <div className=" w-[300px] ">
              <LoadingG data={data} />
            </div>
            <div className=" w-[300px] ">
              <Charging />
            </div>
          </div>
          <div className="sticky top-[25%] px-4 flex gap-6  !text-xs justify-end mr-20">
            {/* <div className=" w-[200px] ">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex items-center justify-between px-1 pt-1 pb-2 pr-2 text-xs italic border-black/40 ">
                  <p className="font-semibold">Rev Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] rounded-md">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex items-center justify-between px-1 pt-1 pb-2 pr-2 text-xs italic border-black/40 ">
                  <p className="font-semibold">Fwd Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] ">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                {" "}
                <div className="flex items-center justify-between px-1 pt-1 pb-2 pr-2 text-xs italic border-black/40 ">
                  <p className="font-semibold">Rev Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] rounded-md">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex items-center justify-between px-1 pt-1 pb-2 pr-2 text-xs italic border-black/40 ">
                  <p className="font-semibold">Fwd Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div> */}
            <Card
              bordered={false}
              style={{
                width: 250,
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9"
              }}
            >
              <div className="flex justify-between">
                <Text strong italic>
                  RM Transfer Bar Thickness
                </Text>
                <Text>-</Text>
                <Text strong>{getRM()}</Text>
              </div>
            </Card>
            <div className="sticky top-[47%] px-4 flex gap-24  !text-xs justify-center">
              <div className=" w-[250px] ">
                <PMC />
              </div>
              <div className="    w-[250px]   ">
                <Three />
              </div>
              <div className=" w-[250px]">
                <Wise />
              </div>
              <div className=" w-[250px]">
                <SSP />
              </div>
              <div className=" w-[250px]">
                <R1 />
              </div>
              <div className=" w-[250px]">
                <R2 />
              </div>
              <div className=" w-[250px]">
                <FM />
              </div>
            </div>

            <div className="sticky top-[75%] px-4 flex gap-6  !text-xs justify-between ml-52">
              <div className=" w-[750px]">
                <FME />
              </div>
              <div className="  ml-[200px] mt-8">
                <BottleNeck />
              </div>
              <div className="ml-[100px] mt-10 w-[300px] mr-24">
                <DC />
              </div>
            </div>

            <div className="sticky top-[90%] pl-6 pt- pt-5 flex left-5 text-center gap-24">
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#001529",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: "20px"
                }}
              >
                <Row gutter={[24, 24]} justify="center">
                  <Col>
                    <Typography.Text
                      strong
                      italic
                      style={{ fontSize: "16px", color: "#fff" }}
                    >
                      Please Select An Option
                    </Typography.Text>
                    <Space direction="vertical" size="small">
                      <Button.Group>
                        <Button
                          type={period === "Last Coil" ? "primary" : "default"}
                          onClick={() => handleChange("Last Coil")}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Last Coil
                        </Button>
                        <Button
                          type={
                            period === "Last 5 Coil" ? "primary" : "default"
                          }
                          onClick={() => handleChange("Last 5 Coil")}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Last 5 Coils
                        </Button>
                        <Button
                          type={period === "Last Hour" ? "primary" : "default"}
                          onClick={() => handleChange("Last Hour")}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Last Hour
                        </Button>
                        <Button
                          type={period === "Last Shift" ? "primary" : "default"}
                          onClick={() => handleChange("Last Shift")}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Last Shift
                        </Button>
                        <Button
                          type={period === "Last Day" ? "primary" : "default"}
                          onClick={() => handleChange("Last Day")}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Last Day
                        </Button>
                        <Button
                          onClick={() => setPieceId(true)}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Custom Piece
                        </Button>
                        <Button
                          type={period === "Custom" ? "primary" : "default"}
                          onClick={() => setDate(true)}
                          style={{ width: "150px", textAlign: "center" }}
                        >
                          Custom Date
                        </Button>
                      </Button.Group>
                    </Space>
                  </Col>

                  <Col>
                    <Typography.Text
                      strong
                      italic
                      style={{ fontSize: "16px", color: "#fff" }}
                    >
                      Visual Graphs
                    </Typography.Text>
                    <Space direction="vertical" size="small">
                      <Button
                        type="primary"
                        onClick={() => setOpen(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        Delay
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen1(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        Gap Time
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen2(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        Process Delay Time
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen7(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        Process Time
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen3(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        FRC
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen4(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        Bottle Neck
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen5(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        GRT Trend
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpen6(true)}
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        WRT Trend
                      </Button>
                    </Space>
                  </Col>
                </Row>

                <Row justify="center" style={{ marginTop: "20px" }}>
                  <Col>
                    <Button.Group>
                      <Button
                        type={mins === false ? "primary" : "default"}
                        onClick={() => setMins(false)}
                        style={{ width: "120px", textAlign: "center" }}
                      >
                        Seconds
                      </Button>
                      <Button
                        type={mins === true ? "primary" : "default"}
                        onClick={() => setMins(true)}
                        style={{ width: "120px", textAlign: "center" }}
                      >
                        Mins
                      </Button>
                    </Button.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Delays open={open} setOpen={setOpen} />
      <Gaps open={open1} setOpen={setOpen1} />
      <Processes open={open2} setOpen={setOpen2} />
      <ProcessTime open={open7} setOpen={setOpen7} />
      <FRC open={open3} setOpen={setOpen3} />
      <BN open={open4} setOpen={setOpen4} />
      <GRT open={open5} setOpen={setOpen5} />
      <WRT open={open6} setOpen={setOpen6} />
      <PieceID open={pieceId} setOpen={setPieceId} />
      <Date open={date} setOpen={setDate} />
    </div>
  );
};

export default Live;
