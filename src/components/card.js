import { Card, Button } from "react-bootstrap";
import "../styles/cardStyle.css";

export const MyCard = ({title,text,imgSrc}) => {

  


  return (
    <Card className="card" style={{ width: "20rem" }}>
      <div className="Container image">
        <Card.Img  variant="top" src={imgSrc} />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};
