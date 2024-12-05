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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      {userData.length > 0 ? (
        sortedIndices.map(e => (
          <div key={e} className="bg-white p-6 m-4 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold text-gray-800">{userData[e - 1].number}</p>
              <p className="text-xl font-semibold text-gray-800">{userData[e - 1].name}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-2xl font-bold">データを読み込み中...</p>
      )}
    </div>
  );
}





{/* <img
src={userData[e - 1].icon.url}
alt={`${userData[e - 1].name}の写真`}
className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
/> */}