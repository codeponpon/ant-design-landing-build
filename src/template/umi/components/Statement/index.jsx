import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faFolderPlus,
  faFolderMinus,
} from '@fortawesome/free-solid-svg-icons';
import All from './all';
import Deposit from './deposit';
import Withdraw from './withdraw';
import useStatement from '../../gql/use-statement';
import '../less/statement.less';

const { TabPane } = Tabs;

const Statement = (props) => {
  const { data, loading, refetch } = useStatement();
  useEffect(() => {
    refetch();
  });

  useEffect(() => {
    if (!loading) {
      props.CheckBalance();
    }
  }, [data]);

  return (
    <div id="statement" className="mt-0 mb-3">
      <Tabs defaultActiveKey="all" id="tabs">
        <TabPane
          key="all"
          tab={
            <span>
              <FontAwesomeIcon icon={faWallet} /> ทั้งหมด
            </span>
          }
        >
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="secondary">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <All data={data && data.userMe.user} />
            </div>
          )}
        </TabPane>
        <TabPane
          key="deposit"
          tab={
            <span>
              <FontAwesomeIcon icon={faFolderPlus} /> ฝาก
            </span>
          }
        >
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="secondary">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <Deposit data={data && data.userMe.user.depositRequest} />
            </div>
          )}
        </TabPane>
        <TabPane
          key="withdraw"
          tab={
            <span>
              <FontAwesomeIcon icon={faFolderMinus} /> ถอน
            </span>
          }
        >
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="secondary">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <Withdraw data={data && data.userMe.user.withdrawRequest} />
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statement;
