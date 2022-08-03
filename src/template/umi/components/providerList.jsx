import { Col } from 'antd';
import { useEffect, useState } from 'react';
import gameProviders from '../api/gameProviders';

export const ProviderList = () => {
  const [providers, setProviders] = useState([]);

  useEffect(async () => {
    if (providers.length === 0) {
      const { data } = await gameProviders();
      console.log('Providers', data);
      setProviders(data);
    }
  }, []);

  console.log('Providers', providers);
  return providers.map((item) => {
    return (
      <Col
        key={item.id}
        md={6}
        xs={24}
        className="block content5-block-content"
      >
        <div className="title-wrapper">
          <h2 name="title" className="title-h1 text-center">
            <p>{item.name}</p>
          </h2>
          <div name="content" className="title-content">
            <a href="#" className="content5-block-content">
              <span>
                <img src={item.items[0].image} height="100%" alt={item.name} />
              </span>
            </a>
          </div>
        </div>
      </Col>
    );
  });
};
