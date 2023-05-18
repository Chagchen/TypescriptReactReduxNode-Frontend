import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { createGame } from './gameSlice';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';



export default function CreateGamePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [game, setGame] = useState({
    name: "",
    address: "",
    numberOfPeople: "",
    date: "",
    time: "",
    fieldNumber: "",
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); //submits only when form is ready not after each input change
    let data = {
      name: game.name,
      address: game.address,
      numberOfPeople: parseInt(game.numberOfPeople),
      date: game.date,
      time: game.time,
      fieldNumber: parseInt(game.fieldNumber)
    }
    //let store know we create a new game
    dispatch(createGame(data))
    //once we submit we need to restet the state. 
    setGame({
      name: "",
      address: "",
      numberOfPeople: "",
      date: "",
      time: "",
      fieldNumber: ""
    });
    navigate('/');
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid sx={{ margin: '0, auto' }}>
        <Typography sx={{ marginBottom: 2 }} variant='h4' fontWeight={600}>Create Game</Typography>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <  TextField
              onChange={e => setGame({ ...game, name: e.target.value })}
              value={game.name}
              fullWidth
              label='name'
            />
          </Grid>

          <Grid item xs={12}>
            <  TextField
              type='string'
              onChange={e => setGame({ ...game, address: e.target.value })}
              value={game.address}
              fullWidth
              label='address'
            />
          </Grid>

          <Grid item xs={12}>
            <  TextField
              type='number'
              onChange={e => setGame({ ...game, numberOfPeople: e.target.value })}
              value={game.numberOfPeople}
              fullWidth
              label='numberOfPeople'
            />
          </Grid>

          <Grid item xs={12}>
            <  TextField
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={e => setGame({ ...game, date: e.target.value })}
              value={game.date}
              fullWidth
              label='date'
            />
          </Grid>

          <Grid item xs={12}>
            <  TextField
              onChange={e => setGame({ ...game, time: e.target.value })}
              value={game.time}
              fullWidth
              label='time'
            />
          </Grid>
          <Grid item xs={12}>
            <  TextField
              type='number'
              onChange={e => setGame({ ...game, fieldNumber: e.target.value })}
              value={game.fieldNumber}
              fullWidth
              label='fieldNumber'
            />
          </Grid>

          <Grid item xs={12}>
            <Button className="blue-btn" onClick={handleSubmit} fullWidth variant='contained'>
              Create
            </Button>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
}
