import ModuleList from "../Modules/List";
import Status from "./Status";
import { Col, Row } from "react-bootstrap";


function Home() {
  return (
    <Row>
      <Col xs={10} md={10}>
        <ModuleList />
      </Col>

      <Col xs={2} md={2}>
        <Status />
      </Col>
    </Row>
  );
}
export default Home;