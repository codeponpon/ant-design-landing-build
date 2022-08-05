import axios from 'axios';

const GAME_PROVIDER_URL = 'https://game-api.zeagame.com/game-categories';
const gameProviders = () => axios.get(GAME_PROVIDER_URL);
export default gameProviders;
