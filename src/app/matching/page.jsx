'use client'

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Page() {
//   const router = useRouter();
//   const [message, setMessage] = useState('');
//   const [response, setResponse] = useState('');

//   const arase = async () => {
//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTPエラー: ${res.status}`);
//       }

//       const data = await res.json();
//       setResponse(data.message);

//       if (data.message.length > 0) {
//         router.push(`/matching/result?response=${encodeURIComponent(data.message)}`);
//       }

//     } catch (error) {
//       console.error('メッセージ送信に失敗しました:', error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
//       <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
//         <p>でな</p>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="メッセージを入力してください"
//           className="w-full p-4 border-2 border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xl"
//         />

//         <button
//           onClick={arase}
//           className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-pink-600 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition duration-300"
//         >
//           送信
//         </button>

//       </div>
//     </div>
//   );
// }


















import React, { useState, useEffect } from 'react';
import ShuffleList from '../utility/shuffleList';
import { formData1, formData2, formData3, shuffleForm } from '../utility/shuffle';

const Page = () => {
  // 結果を代入して表示する
  const [formText1, setFormText1] = useState('');
  const [formText2, setFormText2] = useState('');
  const [formText3, setFormText3] = useState('');

  // シャッフルしたデータを代入
  const [shuffleData1, setShuffleData1] = useState([]);
  const [shuffleData2, setShuffleData2] = useState([]);
  const [shuffleData3, setShuffleData3] = useState([]);

  const [pageNumber, setPageNumber] = useState(-1);

  // 各選択肢の選択されたインデックスを保持
  const [abcNumber1, setAbcNumber1] = useState(null);
  const [abcNumber2, setAbcNumber2] = useState(null);
  const [abcNumber3, setAbcNumber3] = useState(null);

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

  return (
    <>
      <form>
        <h1>{formText1 || '○○'} と {formText2 || '○○'} と {formText3 || '○○'}</h1>

        {/* ボタン1 */}
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

        {/* ボタン2 */}
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

        {/* ボタン3 */}
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
    </>
  );
};

export default Page;
