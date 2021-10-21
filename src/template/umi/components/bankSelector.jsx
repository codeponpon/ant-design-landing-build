import React from 'react';
import { useQuery } from '@apollo/client';
import { SmileOutlined } from '@ant-design/icons';
import { ConfigProvider, Image, Select } from 'antd';
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
      firstPriority.includes(bank.code)
    );
    const sPriorityBanks = banks.filter((bank) =>
      secondPriority.includes(bank.code)
    );
    const otherBanks = banks.filter(
      (bank) => !firstPriority.concat(secondPriority).includes(bank.code)
    );

    return fPriorityBanks.concat(sPriorityBanks).concat(otherBanks);
  }

  return [];
};

export const BankSelector = ({ bankAccount, setBank }) => {
  const { loading, error, data: dataMasterBanks } = useQuery(BANKS);
  let sortedBank = bankSort(dataMasterBanks?.banks);

  if (loading || error) {
    return (
      <ConfigProvider renderEmpty={loading && customizeRenderEmpty}>
        <Select
          name="bankAccountNo"
          size="large"
          style={{ width: '100%', marginBottom: '24px' }}
          placeholder="กำลังโหลดธนาคาร..."
          loading
        />
      </ConfigProvider>
    );
  }

  const options = [];
  sortedBank.map((bank, i) => {
    options.push({
      key: bank.code,
      value: bank.code,
      label: (
        <div className="bank-img">
          <Image width={24} src={bank.logoUrl} />
          &nbsp; {bank.name}
        </div>
      ),
    });
  });

  return (
    <Select
      name="bankAccountNo"
      size="large"
      style={{ width: '100%', marginBottom: '24px' }}
      placeholder="กรุณาเลือกธนาคาร"
      rules={[
        {
          required: true,
          message: 'กรุณาเลือกธนาคาร!',
        },
      ]}
      options={options}
      onSelect={(item) => setBank(item)}
    ></Select>
  );
};
