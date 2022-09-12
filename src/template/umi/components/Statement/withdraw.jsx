import React from 'react';
import ListStatement from './list_statement';

const Withdraw = (props) => {
  return (
    <>
      {props.data &&
        props.data
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((withdraw, index) => {
            return (
              <ListStatement
                key={index}
                type={withdraw.__typename}
                data={withdraw}
                status={withdraw.withdrawRequestStatus ?? 'PENDING'}
              />
            );
          })}
    </>
  );
};

export default Withdraw;
