'use client'

import React, { useState, useEffect } from 'react';
import { client } from '../../../libs/microcms'
import { useSearchParams } from 'next/navigation';

export default function ChoicePage() {

  const searchParams = useSearchParams();
  const message = '[1,2,3,4,5,6,7,8,9,10]';  // 実際にはsearchParamsから取得した値を使う
  const [userData, setUserData] = useState([]);
  const [sortedIndices, setSortedIndices] = useState(JSON.parse(message));
  const counter = [0, 4, 1, 0, 2, 0, 0, 1, 0, 3];

  useEffect(() => {
    const fetchData = async () => {
      const data = (await client.get({ endpoint: process.env.MICROCMS_SERVICE_DOMAIN })).contents;
      setUserData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // sortedIndicesをcounterに基づいてソート
  const sorted = [...sortedIndices].sort((a, b) => counter[a - 1] - counter[b - 1]);
  console.log(sorted);

  // リセットボタンを押したときの処理
  const resetIndices = () => {
    const newSortedIndices = sorted.slice(3); // 最初の3つを取り除いたインデックス
    setSortedIndices(newSortedIndices);  // 状態を更新して再レンダリングをトリガー
    console.log(newSortedIndices);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-6">
      <button onClick={resetIndices}>リセット</button>
      {userData.length > 0 ? (
        sorted.map(e => (
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
