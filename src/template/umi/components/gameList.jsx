import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import gameProviders from '../api/gameProviders';
import gameList from '../api/gameList';

const GameList = (props) => {
  const { providerShortName } = props;
  const [provider, setProvider] = useState(null);
  const [items, setItems] = useState([]);

  const getChildrenToRender = (data) => {
    return data.map((item) => {
      return (
        <Col
          key={item.name}
          {...item}
          /* replace-start */
          data-edit="Col"
          /* replace-end */
        >
          <a
            {...item.children.wrapper}
            /* replace-start */
            data-edit="linkA"
            /* replace-end */
          >
            <span {...item.children.img}>
              <img src={item.children.img.children} height="100%" alt="img" />
            </span>
            <p {...item.children.content}>
              {
                /* replace-start-value = item.children.content.children */
                React.createElement('span', {
                  dangerouslySetInnerHTML: {
                    __html: item.children.content.children,
                  },
                })
                /* replace-end-value */
              }
            </p>
          </a>
        </Col>
      );
    });
  };

  const getBlock = (data) => ({
    name: data.name,
    className: 'block',
    md: 4,
    xs: 24,
    children: {
      wrapper: {
        className: 'content5-block-content',
        href: `/lobby/launchGame?name=${data.shortName}&game=${data.gameCode}&type=${data.gameType}`,
      },
      img: {
        children: data.img,
      },
      content: {
        children: data.content,
      },
    },
  });

  useEffect(async () => {
    if (!provider) {
      const { data } = await gameProviders();
      const found = data
        .filter(
          (d) =>
            !['เกมส์ที่แจ๊คพ็อตแตกบ่อย', 'เกมส์ยอดนิยม', 'ยิงปลา'].includes(
              d.name
            )
        )
        .map((cat) => {
          return cat.items
            .map((item) => {
              if (item.shortName == providerShortName) {
                return item;
              }
            })
            ?.filter((i) => i);
        })
        .find((i) => i.length);

      if (found) {
        setProvider(found[0]);

        const { data: gameProvider } = await gameList(found[0].id);

        const blocks = Object.values(gameProvider.items).map((item) => {
          return getBlock({
            name: `block${item.id}`,
            img: item.image,
            content: item.name,
            shortName: item.shortName,
            gameCode: item.game_code,
            gameType: item.type,
          });
        });

        setItems(blocks);
      }
    }
  }, []);

  return getChildrenToRender(items);
};

export default GameList;
