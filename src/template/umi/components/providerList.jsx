import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import gameProviders from '../api/gameProviders';

const ProviderList = (props) => {
  const { block = 'content5' } = props;
  const [providers, setProviders] = useState([]);
  const [items, setItems] = useState([]);

  const getChildrenToRender = (data) => {
    return data.map((item) => {
      return (
        <Col key={item.name} {...item} data-edit="Col">
          <a {...item.children.wrapper} data-edit="linkA">
            <span {...item.children.img}>
              <img src={item.children.img.children} height="100%" alt="img" />
            </span>
            <p {...item.children.content}>
              {React.createElement('span', {
                dangerouslySetInnerHTML: {
                  __html: item.children.content.children,
                },
              })}
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
        className: `${block}-block-content`,
        href:
          !data.hasGame & data.launchAble
            ? `/lobby/launchGame?name=${data.shortName}&type=${data.gameType}`
            : `/lobby/provider?shortName=${data.shortName}`,
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
    if (providers.length === 0) {
      const allProvider = [];
      const { data } = await gameProviders();
      data
        .filter(
          (d) =>
            !['เกมส์ที่แจ๊คพ็อตแตกบ่อย', 'เกมส์ยอดนิยม', 'ยิงปลา'].includes(
              d.name
            )
        )
        .map((cat) => {
          return cat.items.map((item) => {
            allProvider[item.shortName] = item;
            return allProvider;
          });
        });

      setProviders(allProvider);

      const blocks = Object.values(allProvider).map((item) => {
        return getBlock({
          name: `block${item.id}`,
          img: item.image,
          content: item.name,
          shortName: item.shortName,
          launchAble: item.launchAble,
          hasGame: item.hasGame,
          gameType: item.type,
        });
      });

      setItems(blocks);
    }
  }, []);

  return getChildrenToRender(items);
};

export default ProviderList;
