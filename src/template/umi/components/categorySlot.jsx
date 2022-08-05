import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import gameProviders from '../api/gameProviders';

const CategorySlot = () => {
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    if (category.length === 0) {
      const { data } = await gameProviders();
      const slot = data.find((item) => item.name === 'สล็อต');
      setCategory(slot.items);
    }
  }, []);

  return category.map((item) => {
    return (
      <Col
        key={item.id}
        md={3}
        className="block content16-block-content"
        style={{ marginRight: '10px' }}
      >
        <a href="#" className="content16-block-content">
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

export default CategorySlot;
