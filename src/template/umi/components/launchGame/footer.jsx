import React, { useState } from 'react';
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';

const menuList = [
  {
    page: '/?type=สล็อต',
    gameType: 'SLOT',
    src: 'icon-slot',
    srcActive: 'tabicon-slot-active',
    alt: 'สล็อต',
    nameth: 'สล็อต',
  },
  {
    page: '/?type=คาสิโน',
    gameType: 'CASINO',
    src: 'icon-casino',
    srcActive: 'tabicon-casino-active',
    alt: 'คาสิโน',
    nameth: 'คาสิโน',
  },
  {
    page: '/?type=ยิงปลา',
    gameType: 'Fishing',
    src: 'icon-fish',
    srcActive: 'tabicon-slot-active',
    alt: 'ยิงปลา',
    nameth: 'ยิงปลา',
  },
  {
    page: '/?type=หวย',
    gameType: 'LOTTO',
    src: 'icon-huay',
    srcActive: 'tabicon-huay-active',
    alt: 'หวย',
    nameth: 'หวย',
  },
  {
    page: '/?type=กีฬา',
    gameType: 'SPORT',
    src: 'icon-sport',
    srcActive: 'tabicon-sport-active',
    alt: 'กีฬา',
    nameth: 'กีฬา',
  },
];

const Footer = (props) => {
  const { query } = props.location;
  const [show, setShow] = useState(false);
  const [menuImage] = useState(menuList.map((item) => item.src));
  const [isActive, setIsActive] = useState(null);

  const onSwitch = (itemsw) => {
    setIsActive(itemsw.nameth);
  };

  return (
    <div
      style={{
        zIndex: 100,
        position: 'fixed',
        right: 0,
        bottom: 0,
        textAlign: 'right',
        borderRadius: 0,
        borderRight: 0,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500&display=swap"
        rel="stylesheet"
      ></link>
      <div
        style={{
          fontSize: '2rem',
          cursor: 'pointer',
          marginRight: '1rem',
          marginBottom: '0.5rem',
          color: '#ff5e7b',
        }}
        icon={show ? faChevronCircleDown : faChevronCircleUp}
        onClick={() => {
          setShow(!show);
        }}
      />
      {show && (
        <div className="footer-menu px-0">
          <div className="container px-0">
            <div className="row text-center justify-content-center align-items-end">
              {menuList.map((item, key) => (
                <div className="col" key={`col${key}`}>
                  <a href={item.page} key={`a${key}`}>
                    <>
                      {isActive === item.nameth ||
                        (query?.gameType.toLowerCase() ===
                          item.gameType.toLowerCase() && (
                          <div
                            style={{
                              position: 'absolute',
                              zIndex: 2,
                              background: '#009fd9',
                              width: '100%',
                              height: '128px',
                              left: 0,
                              right: 0,
                              top: '16px',
                              borderRadius: '1rem',
                            }}
                          />
                        ))}
                      <div
                        onClick={() => {
                          onSwitch(item);
                        }}
                      >
                        <div className="img-box">
                          {/* <img
                            width={80}
                            height={80}
                            src={require(`/images/${menuImage[key]}.png`)}
                            className="img-fluid img-lunch-games"
                            alt={item.alt}
                          /> */}
                        </div>
                        <div className="text">{item.nameth}</div>
                      </div>
                    </>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
