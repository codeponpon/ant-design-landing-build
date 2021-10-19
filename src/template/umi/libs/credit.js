import { useLazyQuery } from '@apollo/client';
import { useState, useCallback, useEffect } from 'react';
import useAuth from './useAuth';
import format from './format';
import { WALLET } from '../gql/wallet';

export const getCredit = () => {
  const { data: user, loading } = useAuth();
  const [, setLoading] = useState(loading);
  const [balance, setBalance] = useState(0.0);
  const [getWallet, { loading: loadingWallet, data: wallet }] = useLazyQuery(
    WALLET,
    {
      fetchPolicy: 'network-only',
      onCompleted: (wallet) => {
        setLoading(false);
        setBalance(wallet.wallet);
      },
    },
  );

  const CheckBalance = useCallback(async () => {
    setLoading(true);
    try {
      getWallet({ variables: { username: user.userMe.user.username } });
    } catch (err) {
      console.log('Err: ', err);
    }
  }, [getWallet, user]);

  useEffect(() => {
    if (user?.userMe?.user?.username) {
      CheckBalance();
    }

    if (user?.userMe?.UM) {
      // Set Mantenance Mode
    }
  }, [CheckBalance, user]);
  return {
    user,
    balance: format.balance(balance),
    loading,
    loadingWallet,
    CheckBalance,
  };
};
