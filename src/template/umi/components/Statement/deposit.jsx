import React from 'react';
import ListStatement from './list_statement';
const Deposit = (props) => {
  return (
    <>
      {props.data &&
        props.data
          .sort(
            (a, b) =>
              (b.createdAt != undefined
                ? new Date(b.createdAt).getTime()
                : new Date(b.transferedAt).getTime()) -
              (a.createdAt != undefined
                ? new Date(a.createdAt).getTime()
                : new Date(a.transferedAt).getTime()),
          )
          .map((deposit, index) => {
            return (
              <ListStatement
                key={index}
                type={deposit.__typename}
                data={deposit}
                status={deposit.depositRequestStatus ?? 'PENDING'}
                remark={deposit.remark ?? deposit.remark}
              />
            );
          })}
    </>
  );
};

export default Deposit;
