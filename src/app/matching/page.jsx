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
      <form>
        <h1>{formText1 || '○○'} で {formText2 || '○○'} な {formText3 || '○○'}</h1>

        <div onClick={() => btnSwitch(0)}>
          選択肢１
          <p>{String.fromCharCode(65 + (abcNumber1 ?? -65))}</p>
        </div>
        {pageNumber === 0 && (
          <ShuffleList
            shuffleData={shuffleData1}
            setFormText={setFormText1}
            abcNumber={(index) => setAbcNumber1(index)}
          />
        )}

        <div onClick={() => btnSwitch(1)}>
          選択肢２
          <p>{String.fromCharCode(65 + (abcNumber2 ?? -65))}</p>
        </div>
        {pageNumber === 1 && (
          <ShuffleList
            shuffleData={shuffleData2}
            setFormText={setFormText2}
            abcNumber={(index) => setAbcNumber2(index)}
          />
        )}

        <div onClick={() => btnSwitch(2)}>
          選択肢３
          <p>{String.fromCharCode(65 + (abcNumber3 ?? -65))}</p>
        </div>
        {pageNumber === 2 && (
          <ShuffleList
            shuffleData={shuffleData3}
            setFormText={setFormText3}
            abcNumber={(index) => setAbcNumber3(index)}
          />
        )}
      </form>

      <button
        onClick={opanAiBtn}
        className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-pink-600 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition duration-300"
      >
        送信
      </button>

      <p>{response}</p>

    </>
  );
};

export default Page;
