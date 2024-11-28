'use client'

import React, { useState, useEffect } from 'react';
import { client } from '../../libs/microcms'

const Choice = ({ response }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = (await client.get({ endpoint: process.env.MICROCMS_SERVICE_DOMAIN })).contents;
        setUserData(data);
        console.log(data)
    }
    fetchData();
  }, []);

  // const response = '[1,2,3]';
  let indices = JSON.parse(response);

  let counter = [0, 4, 1, 0, 2, 0, 0, 1, 0, 3];

  let sortedIndices = [...indices].sort((a, b) => counter[a - 1] - counter[b - 1]);

  return (
    <>

      {userData.length > 0 ? (
        sortedIndices.map(e => (
          <div key={e}>
            <p>{userData[e - 1].name}</p>
            <img src={userData[e -1].icon.url} alt="" />
          </div>
        ))
      ) : (
        <p>データを読み込み中...</p>
      )}

    </>
  );
}

export default Choice;