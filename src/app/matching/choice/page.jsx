'use client'

import React, { useState, useEffect } from 'react';
import { client } from '../../../libs/microcms'
import { useSearchParams } from 'next/navigation';

export default function ChoicePage() {

  const searchParams = useSearchParams();
  // const message = searchParams.get('response');
  const message = '[1,2,3,4,5]';
  const [userData, setUserData] = useState([]);
  let indices = JSON.parse(message);
  let counter = [0, 4, 1, 0, 2, 0, 0, 1, 0, 3];

  useEffect(() => {
    const fetchData = async () => {
        const data = (await client.get({ endpoint: process.env.MICROCMS_SERVICE_DOMAIN })).contents;
        setUserData(data);
        console.log(data)
    }
    fetchData();
  }, []);

  let sortedIndices = [...indices].sort((a, b) => counter[a - 1] - counter[b - 1]);
  console.log(sortedIndices)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-6">
      {userData.length > 0 ? (
        sortedIndices.map(e => (
          <div key={e} className='w-36 bg-slate-200'>
            <div className='m-auto w-[80%]'>
              <img src={userData[e -1].icon.url} alt={`${userData[e - 1].name}の写真`} className=''/>
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