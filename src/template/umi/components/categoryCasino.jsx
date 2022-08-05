import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import gameProviders from '../api/gameProviders';

const CategoryCasino = () => {
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    if (category.length === 0) {
      const { data } = await gameProviders();
      const casino = data.find((item) => item.name === 'คาสิโน');
      setCategory(casino.items);
    }
  }, []);

  return category.map((item) => {
    return (
      <Col
        key={item.id}
        md={3}
        className="block content15-block-content"
        style={{ marginRight: '10px' }}
      >
        <a href="#" className="content15-block-content">
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

export default CategoryCasino;
