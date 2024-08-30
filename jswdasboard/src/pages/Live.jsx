import React, { useContext, useState } from "react";
import { Card, Row, Col, Button, Typography, Table, Modal } from "antd";
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
import DatePicker from "../components/Date";
import { roundOff } from "../utils/roundoff";

const { Title } = Typography;

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
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative h-[90vh] bg-cover bg-no-repeat">
        <img
          src="http://127.0.0.1:5000/video"
          className="absolute w-screen h-screen"
          alt="Live Monitoring"
        />
        <Row gutter={[16, 16]} className="sticky top-[15%] px-4">
          <Col span={8}>
            <Card title="Loading Gauge" bordered={false}>
              <LoadingG data={data} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Charging" bordered={false}>
              <Charging />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sticky top-[25%] px-4">
          <Col span={6}>
            <Card title="PMC" bordered={false}>
              <PMC />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Three" bordered={false}>
              <Three />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Wise" bordered={false}>
              <Wise />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="SSP" bordered={false}>
              <SSP />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sticky top-[35%] px-4">
          <Col span={6}>
            <Card title="R1" bordered={false}>
              <R1 />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="R2" bordered={false}>
              <R2 />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="FM" bordered={false}>
              <FM />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="FME" bordered={false}>
              <FME />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sticky top-[45%] px-4">
          <Col span={18}>
            <Card title="BottleNeck Analysis" bordered={false}>
              <BottleNeck />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="DC" bordered={false}>
              <DC />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sticky top-[55%] px-4">
          <Col span={24}>
            <Table
              dataSource={[
                { key: "1", label: "RM Transfer Bar Thickness", value: getRM() }
              ]}
              columns={[
                { title: "Label", dataIndex: "label", key: "label" },
                { title: "Value", dataIndex: "value", key: "value" }
              ]}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sticky top-[65%] px-4">
          <Col span={12}>
            <Title level={4} className="pb-1 text-white">
              Please Select An Option
            </Title>
            <div className="flex justify-center gap-3">
              {[
                "Last Coil",
                "Last 5 Coils",
                "Last Hour",
                "Last Shift",
                "Last Day"
              ].map((option) => (
                <Button
                  key={option}
                  type={period === option ? "primary" : "default"}
                  onClick={() => handleChange(option)}
                >
                  {option}
                </Button>
              ))}
              <Button onClick={() => setPieceId(true)}>Custom Piece</Button>
              <Button onClick={() => setDate(true)}>Custom Date</Button>
            </div>
          </Col>
          <Col span={12}>
            <Title level={4} className="pb-1 text-white">
              Visual Graphs
            </Title>
            <div className="flex justify-center gap-3">
              {[
                { label: "Delay", onClick: () => setOpen(true) },
                { label: "Gap Time", onClick: () => setOpen1(true) },
                { label: "Process Delay Time", onClick: () => setOpen2(true) },
                { label: "Process Time", onClick: () => setOpen7(true) },
                { label: "FRC", onClick: () => setOpen3(true) },
                { label: "Bottle Neck", onClick: () => setOpen4(true) },
                { label: "GRT Trend", onClick: () => setOpen5(true) },
                { label: "WRT Trend", onClick: () => setOpen6(true) }
              ].map((graph) => (
                <Button
                  key={graph.label}
                  type="primary"
                  onClick={graph.onClick}
                >
                  {graph.label}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sticky top-[75%] px-4">
          <Col span={12}>
            <Button
              block
              type={mins === false ? "primary" : "default"}
              onClick={() => setMins(false)}
            >
              Seconds
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              type={mins === true ? "primary" : "default"}
              onClick={() => setMins(true)}
            >
              Mins
            </Button>
          </Col>
        </Row>
      </div>
      {/* Modals */}
      <Modal
        title="Delays"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Delays />
      </Modal>
      <Modal
        title="Gaps"
        visible={open1}
        onCancel={() => setOpen1(false)}
        footer={null}
      >
        <Gaps />
      </Modal>
      <Modal
        title="Processes"
        visible={open2}
        onCancel={() => setOpen2(false)}
        footer={null}
      >
        <Processes />
      </Modal>
      <Modal
        title="Process Time"
        visible={open7}
        onCancel={() => setOpen7(false)}
        footer={null}
      >
        <ProcessTime />
      </Modal>
      <Modal
        title="FRC"
        visible={open3}
        onCancel={() => setOpen3(false)}
        footer={null}
      >
        <FRC />
      </Modal>
      <Modal
        title="Bottle Neck"
        visible={open4}
        onCancel={() => setOpen4(false)}
        footer={null}
      >
        <BN />
      </Modal>
      <Modal
        title="GRT Trend"
        visible={open5}
        onCancel={() => setOpen5(false)}
        footer={null}
      >
        <GRT />
      </Modal>
      <Modal
        title="WRT Trend"
        visible={open6}
        onCancel={() => setOpen6(false)}
        footer={null}
      >
        <WRT />
      </Modal>
      <Modal
        title="Piece ID"
        visible={pieceId}
        onCancel={() => setPieceId(false)}
        footer={null}
      >
        <PieceID />
      </Modal>
      <Modal
        title="Custom Date"
        visible={date}
        onCancel={() => setDate(false)}
        footer={null}
      >
        <DatePicker />
      </Modal>
    </div>
  );
};

export default Live;
