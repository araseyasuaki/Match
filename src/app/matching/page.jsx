'use client'

import React, { useState, useEffect } from 'react';
import ShuffleList from '../utility/shuffleList';
import { formData1, formData2, formData3, shuffleForm } from '../utility/shuffle';
import { useRouter } from 'next/navigation';

const Page = () => {

  // 結果を代入して表示する
  const [formText1, setFormText1] = useState('');
  const [formText2, setFormText2] = useState('');
  const [formText3, setFormText3] = useState('');

  // シャッフルしたデータを代入
  const [shuffleData1, setShuffleData1] = useState([]);
  const [shuffleData2, setShuffleData2] = useState([]);
  const [shuffleData3, setShuffleData3] = useState([]);

  // 選択肢の管理
  const [pageNumber, setPageNumber] = useState(-1);

  // 各選択肢の選択された番号を代入
  const [abcNumber1, setAbcNumber1] = useState(null);
  const [abcNumber2, setAbcNumber2] = useState(null);
  const [abcNumber3, setAbcNumber3] = useState(null);

  const [response, setResponse] = useState('');

  const router = useRouter();

  useEffect(() => {
    // データをシャッフルして取得
    const shuffle1 = shuffleForm(formData1);
    const shuffle2 = shuffleForm(formData2);
    const shuffle3 = shuffleForm(formData3);
    // シャッフルしたデータを代入
    setShuffleData1(shuffle1);
    setShuffleData2(shuffle2);
    setShuffleData3(shuffle3);
  }, []);

  // ボタンをクリックしたときに状態を切り替える
  const btnSwitch = (number) => {
    // クリックしたボタンが既に開いている場合は閉じる、それ以外のボタンを開く
    setPageNumber(pageNumber === number ? -1 : number);
  };

  const opanAiBtn = async () => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formText1, formText2, formText3 }),
      });

      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.message);

      if (data.message.length > 0) {
        router.push(`/matching/result?response=${encodeURIComponent(data.message)}`);
      }

    } catch (error) {
      console.error('メッセージ送信に失敗しました:', error);
    }
  };

  return (
    <>
      <form className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          {formText1 || '○○'} で {formText2 || '○○'} な {formText3 || '○○'}
        </h1>

        <div
          onClick={() => btnSwitch(0)}
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gradient-to-l transition-all"
        >
          選択肢１
          <p className="mt-2 text-lg">{String.fromCharCode(65 + (abcNumber1 ?? -65))}</p>
        </div>
        {pageNumber === 0 && (
          <ShuffleList
            shuffleData={shuffleData1}
            setFormText={setFormText1}
            abcNumber={(index) => setAbcNumber1(index)}
          />
        )}

        <div
          onClick={() => btnSwitch(1)}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gradient-to-l transition-all"
        >
          選択肢２
          <p className="mt-2 text-lg">{String.fromCharCode(65 + (abcNumber2 ?? -65))}</p>
        </div>
        {pageNumber === 1 && (
          <ShuffleList
            shuffleData={shuffleData2}
            setFormText={setFormText2}
            abcNumber={(index) => setAbcNumber2(index)}
          />
        )}

        <div
          onClick={() => btnSwitch(2)}
          className="cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gradient-to-l transition-all"
        >
          選択肢３
          <p className="mt-2 text-lg">{String.fromCharCode(65 + (abcNumber3 ?? -65))}</p>
        </div>
        {pageNumber === 2 && (
          <ShuffleList
            shuffleData={shuffleData3}
            setFormText={setFormText3}
            abcNumber={(index) => setAbcNumber3(index)}
          />
        )}

        <button
          onClick={opanAiBtn}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition duration-300"
        >
          送信
        </button>
      </form>

      {response && (
        <div className="max-w-3xl mx-auto mt-6 text-center">
          <p className="text-xl font-medium text-gray-700">{response}</p>
        </div>
      )}
    </>
  );
};

export default Page;
