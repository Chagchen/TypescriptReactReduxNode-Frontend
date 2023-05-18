import React, { MouseEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createGame, deleteGame, filterGame, getGameById, updateGame } from './gameSlice';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { blueGrey, red } from '@mui/material/colors';

export default function EditGamePage() {
  const dispatch = useAppDispatch();
  const { singleGame} = useAppSelector(state => state.games);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    dispatch(getGameById(id));
  }, [])

  useEffect(() => {
    setGameInitialState(); //we make a call for this one. 
  }, [singleGame]) //we put into thie array the state that we depend on. in this case the single game from null to singeGame data. 

  const [game, setGame] = useState({
    name: "",
    address: "",
    numberOfPeople: "",
    date: "",
    time: "",
    fieldNumber: "",
  });

  const setGameInitialState=() => {
    if(!singleGame) return; //if it's null return else do this 
    setGame({
      name: singleGame?.name,
      address: singleGame?.address,
      numberOfPeople: singleGame?.numberOfPeople.toString()!,
      date: singleGame?.date.toString(),
      time: singleGame?.time,
      fieldNumber: singleGame?.fieldNumber.toString()!,
    })
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); //submits only when form is ready not after each input change
    let data = {
      _id: id,
      name: game.name,
      address: game.address,
      numberOfPeople: parseInt(game.numberOfPeople),
      date: game.date,
      time: game.time,
      fieldNumber: parseInt(game.fieldNumber)
    }
    //let store know we create a new game
    dispatch(updateGame(data))
    //once we submit we need to restet the state. 
    navigate('/')
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (!id) return;
    dispatch(deleteGame(id))
    //filterGame(id);
    navigate('/')
  }

  function rgb(arg0: number, arg1: number, arg2: number): any {
    throw new Error('Function not implemented.');
  }

  function gradient(arg0: number, deg: any, arg2: any, arg3: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid sx={{ margin: '0, auto' }}>
        <Typography sx={{ marginBottom: 2 }} variant='h4' fontWeight={600}>
          {game.name} | {game.address} | {game.time} | {game.date?.toString().substring(0,10)}
        </Typography>
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
              defaultValue={game.date}
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={e => setGame({ ...game, date: e.target.value })}
              value={game.date}
              fullWidth
              label={`Current Date: ${game.date.substring(0,10)}`}
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
            <Button className='green-btn'
            onClick={handleSubmit} 
            fullWidth 
            variant='contained'>
              Update
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button 
            onClick={handleDelete}
            sx={{backgroundColor: '#e60000'}}
            fullWidth 
            variant='contained'>
             Delete
            </Button>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
}
