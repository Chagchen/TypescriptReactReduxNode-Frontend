import { PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Game } from "../../interfaces/Game";
import axios from "axios";



//this has to do with the game'sfeatures state not the game object intself or games. 
interface GameState {
  games: Game[] | null;
  loading: boolean;
  singleGame: Game | null;
  errors: any;
  
}

//now that we have the interface we need to declare an initial state
const initialState: GameState = {
  games: [],
  singleGame: null,
  loading: false,
  errors:null
}

//Actions are processes that get data from the backend. asyncThunk allows redux to work asynchronously
export const getGames = createAsyncThunk<Game[]>(
  "games/getGames",
  async (_,thunkAPI) => {
    try{
      const response = await axios.get('http://localhost:8080/api/games');
      return response.data;
    } catch(error){
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGameById = createAsyncThunk<Game, string>(
  "games/getGameById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/games/game/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const createGame = createAsyncThunk<Game, Object>(
  "games/createGame",
  async (data,thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/api/games/game', data);
      return response.data;
    } catch(error){
      return thunkAPI.rejectWithValue(error);
  }
}); 

export const updateGame = createAsyncThunk<Game, Object | any >(
  "games/updateGame",
  async(data, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/games/game/${data._id}` , data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const deleteGame = createAsyncThunk<string, string>(
  "games/deleteGame",
  //thunkAPI.dispatch(getGames());
  async(id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/games/game/${id}`);
      thunkAPI.dispatch(getGames()); //reload on the front when deleted at the back
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

//Reducers reduce to a specific state or => changes state. we take the data that 
//we just got and put it into a state. 
export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload
    } ,
    //when delete the backend we make it filter on the frontend
    filterGame: (state, action) => {
      state.games = state.games?.filter(game => game._id !== action.payload)!;
    }
  },

  //we have 2 outcomes we get the game data or not. if not we can use the extraReducers. we model it here. 
  extraReducers: (builder) => {
    builder.addCase(getGames.pending, (state) =>{
      state.loading = true;
    });
    builder.addCase(getGames.fulfilled, (state, action) =>{
      state.games = action.payload;
      state.loading = false; //change to false as it finished loading
    });
    builder.addCase(getGames.rejected, (state, action) =>{
      state.loading = false; //this case we didn't get any game data
      state.errors = action.payload;
    });
    builder.addCase(getGameById.pending, (state) =>{
      state.loading = true; 
    });
    builder.addCase(getGameById.fulfilled, (state, action) => {
      state.singleGame = action.payload;
      state.loading = false;
    });
    builder.addCase(updateGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.singleGame = action.payload;
      state.loading = false;
    });
  }
});

export default gameSlice.reducer; 
export const {setGames, filterGame} = gameSlice.actions;
