import React from 'react';
import { useQuery } from '@apollo/client';
import { ProFormSelect } from '@ant-design/pro-form';
import { SmileOutlined } from '@ant-design/icons';
import { ConfigProvider, Image } from 'antd';
import { BANKS } from '../gql/banks';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Data Not Found</p>
  </div>
);

const bankSort = (banks) => {
  if (banks) {
    const firstPriority = ['SCB', 'KBANK'];
    const secondPriority = ['KTB', 'BAY', 'BBL', 'GSB'];

    const fPriorityBanks = banks.filter((bank) =>
      firstPriority.includes(bank.code),
    );
    const sPriorityBanks = banks.filter((bank) =>
      secondPriority.includes(bank.code),
    );
    const otherBanks = banks.filter(
      (bank) => !firstPriority.concat(secondPriority).includes(bank.code),
    );

    return fPriorityBanks.concat(sPriorityBanks).concat(otherBanks);
  }

  return [];
};

export const BankSelector = () => {
  const { loading, error, data: dataMasterBanks } = useQuery(BANKS);
  let sortedBank = bankSort(dataMasterBanks?.banks);
  console.log(sortedBank);
  if (loading)
    return (
      <ConfigProvider renderEmpty={loading && customizeRenderEmpty}>
        <ProFormSelect
          width="md"
          placeholder="กำลังโหลดธนาคาร..."
        ></ProFormSelect>
      </ConfigProvider>
    );

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <ProFormSelect
        width="md"
        fieldProps={{
          labelInValue: true,
        }}
        request={async () => {
          return sortedBank.map((bank, i) => {
            return {
              label: bank.name,
              value: bank.code,
              key: bank.code,
              logo: bank.logoUrl,
            };
          });
        }}
        fieldProps={{
          optionItemRender(item) {
            return (
              <React.Fragment>
                <div className="bank-img">
                  <Image width={24} src={item.logo} />
                  &nbsp; {item.label}
                </div>
              </React.Fragment>
            );
          },
        }}
        name="bank"
        placeholder="กรุณาเลือกธนาคาร"
        rules={[
          {
            required: true,
            message: 'กรุณาเลือกธนาคาร!',
          },
        ]}
      />
    </ConfigProvider>
  );
};
