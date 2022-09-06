import axios from 'axios';

const GAME_LIST_PROVIDER_URL = 'https://game-api.zeagame.com/provider';
const gameList = (id) => axios.get(`${GAME_LIST_PROVIDER_URL}/${id}/games`);
export default gameList;
