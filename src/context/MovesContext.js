import createDataContext from './createDataContext';
import movesApi from '../api/moves';
import { navigate } from '../utils/navigationRef';
import { CommonActions } from '@react-navigation/native';

function movesReducer(state, action) {
  switch (action.type) {
    case 'get_moves':
      return action.payload;
    default:
      return state;
  }
}

function getMoves(dispatch) {
  return async () => {
    const res = await movesApi.get('/moves');
    dispatch({ type: 'get_moves', payload: res.data });
  };
}

function createMoves(dispatch) {
  return async (name, locations) =>
    await movesApi.post('/moves', { name, locations });
}

function deleteMoves(dispatch) {
  return async (id) => {
    const res = await movesApi.delete(`/deletemove/${id}`);

    if (res.status === 204) navigate('MovesList');
  };
}

export const { Context, Provider } = createDataContext(
  movesReducer,
  { getMoves, createMoves, deleteMoves },
  []
);
