import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

import "./SingleVacation.css";
import moment from "moment";

import Icons from "../../NavBars/Icons/Icons";

interface vacationProps {
  vacation_code: number;
  destination: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  file_img_name: string;
  likes: number;
  isAdmin: boolean;
  onDelete: () => void;
}
function SingleVacation(props: vacationProps): JSX.Element {
  const imageUrl = `http://localhost:4000/${props.vacation_code}_${props.file_img_name}`;

  return (
    <div className="SingleVacation">
      <Box width="300px">
        <Card variant="outlined">
          <div className="cardHeader">
            <CardHeader
              title={
                <div className="headerTitle">
                  <Icons
                    vacationId={props.vacation_code}
                    onDelete={props.onDelete}
                    isAdmin={props.isAdmin}
                    initialLikes={props.likes}
                  />
                </div>
              }
            />
          </div>

          <CardMedia
            sx={{ height: 270, objectFit: "cover" }}
            component="img"
            src={imageUrl}
            alt={`${props.destination}`}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography variant="body2">{props.destination}</Typography>
            <Typography variant="body2">{props.description}</Typography>
            <Typography variant="body2">
              {moment(props.start_date).format("DD/MM/YYYY")}
            </Typography>{" "}
            <Typography variant="body2">
              {moment(props.end_date).format("DD/MM/YYYY")}
            </Typography>
            <CardActions>
              <Button variant="contained" size="large">
                {props.price}€
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default SingleVacation;
