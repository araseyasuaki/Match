'use client'

import React, { useState, useEffect } from 'react';
import { client } from '../../../libs/microcms'
import { useSearchParams } from 'next/navigation';

export default function ChoicePage() {

  // もらった情報取得
  const searchParams = useSearchParams();
  const message = searchParams.get('response');

  const [userData, setUserData] = useState([]);
  const [sortedIndices, setSortedIndices] = useState(JSON.parse(message));

  useEffect(() => {
    const fetchData = async () => {
      const data = (await client.get({ endpoint: process.env.MICROCMS_SERVICE_DOMAIN })).contents;
      setUserData(data);
      // console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {userData.length > 0 ? (
        sortedIndices.map(e => (
          <div key={e}>
            <div>
              <img src={userData[e - 1].icon.url} alt={`${userData[e - 1].name}の写真`} />
              <p>{userData[e - 1].name}</p>
            </div>
          </div>
        ))
      ) : (
        <p>データを読み込み中...</p>
      )}
    </div>
  );
}
