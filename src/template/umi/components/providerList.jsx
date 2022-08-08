import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import gameProviders from '../api/gameProviders';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
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
        className: 'content14-block-content',
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
        });
      });

      console.log('allProvider', allProvider);
      setItems(blocks);
    }
  }, []);

  return getChildrenToRender(items);
};

export default ProviderList;
