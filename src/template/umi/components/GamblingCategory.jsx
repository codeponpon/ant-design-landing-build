import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import gameProviders from '../api/gameProviders';

const GamblingCategory = (props) => {
  const { name, block, columns = 3 } = props;
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    if (category.length === 0) {
      const { data } = await gameProviders();
      const slot = data.find((item) => item.name === name);
      setCategory(slot.items);
    }
  }, []);

  return category.map((item) => {
    return (
      <Col
        key={item.id}
        md={columns}
        className={`block ${block}-block-content`}
        style={{ marginRight: '10px' }}
      >
        <a href="#" className={`${block}-block-content`}>
          <span>
            {' '}
            <img src={item.image} height="100%" alt={item.name} />
          </span>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.name}
          </p>
        </a>
      </Col>
    );
  });
};

export default GamblingCategory;
