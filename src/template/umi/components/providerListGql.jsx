import { Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GAME_PROVIDERS } from '../gql/gameProviders';

export const ProviderList = () => {
  const { loading, error, data } = useQuery(GAME_PROVIDERS);
  if (loading) return <p>Loading Providers...</p>;
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
    allGames[key].map((item, i) => {
      return (
        <Col
          key={i.toString()}
          md={6}
          xs={24}
          className="block content5-block-content"
        >
          <a href="#" className="content5-block-content">
            <span>
              <img
                src={
                  item.imagePath
                    ? item.imagePath.match(/https:/g)
                      ? item.imagePath
                      : `http://${item.imagePath}`
                    : 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg'
                }
                height="100%"
                alt={item.name}
              />
            </span>
            <p>{item.name}</p>
          </a>
        </Col>
      );
    }),
  );
};
