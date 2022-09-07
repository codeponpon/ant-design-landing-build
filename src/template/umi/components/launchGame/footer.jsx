import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleUp,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

const ChevronIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  color: #ff5e7b;
`;

const FooterMenu = styled.div`
  z-index: 100;
  position: fixed;
  right: 0;
  bottom: 0;
  text-align: right;
  border-radius: 0;
  border-right: 0;
`;

const ActiveStyle = styled.div`
  position: absolute;
  z-index: 2;
  background: #009fd9;
  width: 100%;
  height: 128px;
  left: 0;
  right: 0;
  top: 16px;
  border-radius: 1rem;
`;

const menuList = [
  {
    page: '/?type=สล็อต#Gambling2_0',
    gameType: 'SLOT',
    src: 'https://zeagame.com/images/icon-slot.png',
    srcActive: 'tabicon-slot-active',
    alt: 'สล็อต',
    nameth: 'สล็อต',
  },
  {
    page: '/?type=คาสิโน#Gambling1_0',
    gameType: 'CASINO',
    src: 'https://zeagame.com/images/icon-casino.png',
    srcActive: 'tabicon-casino-active',
    alt: 'คาสิโน',
    nameth: 'คาสิโน',
  },
  {
    page: '/?type=ยิงปลา#Gambling4_0',
    gameType: 'Fishing',
    src: 'https://zeagame.com/images/icon-fish.png',
    srcActive: 'tabicon-slot-active',
    alt: 'ยิงปลา',
    nameth: 'ยิงปลา',
  },
  {
    page: '/?type=หวย#Gambling11_0',
    gameType: 'LOTTO',
    src: 'https://zeagame.com/images/icon-huay.png',
    srcActive: 'tabicon-huay-active',
    alt: 'หวย',
    nameth: 'หวย',
  },
  {
    page: '/?type=กีฬา#Gambling8_0',
    gameType: 'SPORT',
    src: 'https://zeagame.com/images/icon-huay.png',
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
    <FooterMenu>
      <link
        href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500&display=swap"
        rel="stylesheet"
      ></link>
      <ChevronIcon
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
                        ((query?.gameType + '').toLowerCase() ===
                          item.gameType.toLowerCase() && <ActiveStyle />)}
                      <div
                        onClick={() => {
                          onSwitch(item);
                        }}
                      >
                        <div className="img-box">
                          <img
                            width={80}
                            height={80}
                            src={menuImage[key]}
                            className="img-fluid img-lunch-games"
                            alt={item.alt}
                          />
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
    </FooterMenu>
  );
};

export default Footer;
