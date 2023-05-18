import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getGameById } from "./gameSlice";
import { Link, useParams } from "react-router-dom";
import { lightBlue } from "@mui/material/colors";

export default function SingleGamePage() {
  const dispatch = useAppDispatch();
  const { singleGame } = useAppSelector(state => state.games);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      alert("null id");
      return;
    }
    dispatch(getGameById(id))
  }, [])

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h2" fontWeight={400} sx={{my: 3}}>Welcome To This Game</Typography>
      <Typography  sx={{color: 'grey'}} variant="h4" fontWeight={600}>
        {`${singleGame?.address} ${singleGame?.time ? `- ${singleGame?.time}` : ""} - ${singleGame?.date ?
          (singleGame?.date)
            .toString()
            .split('T')[0]
            .split("-")
            .reverse()
            .join('/')
          : "  "
          }`}
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h6">
            {singleGame?.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            No. Players: {singleGame?.numberOfPeople}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            Field Number: {singleGame?.fieldNumber}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            Time: {singleGame?.time}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to={`/editgame/${singleGame?._id}`}>
            <Button className="green-btn" variant="contained">
              Edit
            </Button>
          </Link>
        </Grid>
      </Grid>

    </Container>
  );
}

