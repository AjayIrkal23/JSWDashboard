import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Text } = Typography;

const Charging = () => {
  return (
    <Card
      title="Charging Information"
      bordered={false}
      style={{
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px"
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="flex justify-between">
            <Text strong>Charging Gap Time</Text>
            <Text>-</Text>
            <Text strong>25</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Charging;
