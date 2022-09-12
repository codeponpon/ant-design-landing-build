import React from 'react';
import ListStatement from './list_statement';
const All = (props) => {
  let statement_arr =
    props.data && props.data.depositRequest.concat(props.data.withdrawRequest);
  return (
    <>
      {statement_arr &&
        statement_arr
          .sort(
            (a, b) =>
              (b.createdAt != undefined
                ? new Date(b.createdAt).getTime()
                : new Date(b.transferedAt).getTime()) -
              (a.createdAt != undefined
                ? new Date(a.createdAt).getTime()
                : new Date(a.transferedAt).getTime()),
          )
          .map((data, index) => {
            return (
              <ListStatement
                key={index}
                type={data.__typename}
                data={data}
                status={data.depositRequestStatus ?? data.withdrawRequestStatus}
                remark={data.remark ?? data.remark}
              />
            );
          })}
    </>
  );
};

export default All;
