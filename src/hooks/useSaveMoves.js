import { useContext } from 'react';
import { Context as MovesContext } from '../context/MovesContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../utils/navigationRef';

export default () => {
  const { createMoves } = useContext(MovesContext);
  const {
    state: { locations, name },
    reset,
  } = useContext(LocationContext);

  const saveMoves = async () => {
    const res = await createMoves(name, locations);

    if (res.status === 200) {
      reset();
      navigate('MovesList');
    }
  };

  return [saveMoves];
};
