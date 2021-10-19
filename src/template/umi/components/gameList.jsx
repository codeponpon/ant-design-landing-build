import { Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GAME_PROVIDERS } from '../gql/gameProviders';

export const GameList = () => {
  const { loading, error, data } = useQuery(GAME_PROVIDERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const allGames = [];
  data.gameProviders.map((item) => {
    if (!allGames[item.gameType]) {
      allGames[item.gameType] = [];
      allGames[item.gameType].push(item);
    } else {
      allGames[item.gameType].push(item);
    }
  });

  return Object.keys(allGames).map((key) =>
    allGames[key].map((item) =>
      item.games.map((game, i) => {
        let href = `/launch/game?name=${game.providerCode}&gameCode=${game.gameCode}`;
        if (game.iframable) {
          href = `/launch_games?name=${game.providerCode}&game=${game.gameCode}`;
        }
        return (
          <Col
            key={i.toString()}
            md={6}
            xs={24}
            className="block content5-block-content"
          >
            <a href={href} className="content5-block-content">
              <span>
                <img
                  src={
                    game.imagePath
                      ? game.imagePath.match(/https:/g)
                        ? game.imagePath
                        : `http://${game.imagePath}`
                      : 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg'
                  }
                  height="100%"
                  alt={game.gameName}
                />
              </span>
              <p>{game.gameName}</p>
            </a>
          </Col>
        );
      }),
    ),
  );
};
