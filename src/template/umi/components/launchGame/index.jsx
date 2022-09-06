import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import getMobileDetect from '../../libs/getMobileDetect/index';
import { LAUNCH_GAMES } from '../../gql/launchGames';
import Display from './display';
import Loading from './loading';
import { getToken } from '../../libs/authToken';

const LaunchGames = (props) => {
  const { pathname, query } = props.location;
  const [token, setToken] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [getGameUrl, { data }] = useLazyQuery(LAUNCH_GAMES, {
    context: { headers: { authorization: `Bearer ${token}` } },
    onCompleted: (data) => {
      const url = data.launchGame.url;
      if (url.indexOf('Error') !== -1) {
        Swal.fire({
          title: 'แจ้งเตือน',
          text: 'ปิดปรับปรุงเซิฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง',
          icon: 'warning',
          confirmButtonText: 'ปิด',
        }).then(() => {
          window.close();
        });
      } else {
        setGameUrl(url);
      }
    },
    onError: (_data) => {
      Swal.fire({
        title: 'แจ้งเตือน',
        text: 'ปิดปรับปรุงเซิฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง',
        icon: 'warning',
        confirmButtonText: 'ปิด',
      }).then(() => {
        window.close();
      });
    },
  });

  const currentDevice = getMobileDetect(
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  );

  const postGames = async (gName, gCode) => {
    reload();

    getGameUrl({
      variables: {
        provider: gName,
        isMobile: currentDevice.isMobile(),
        gameCode: gCode,
        redirectUrl: window?.location?.origin,
      },
    });
  };

  useEffect(() => {
    setToken(getToken());
    if (pathname === '/lobby/launchGame') {
      if (gameUrl === '') {
        const name = query?.name || '';
        const game = query?.game || '';
        postGames(name, game);
      }
    }
  }, []);

  const reload = () => {
    return false;
  };

  return gameUrl != '' ? (
    <Display gameUrl={gameUrl} reload={reload} {...props} />
  ) : (
    <Loading />
  );
};
export default LaunchGames;
