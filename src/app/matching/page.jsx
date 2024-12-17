'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const router = useRouter(); // useRouterを初期化

  const handleChange = (e) => {
    setText(e.target.value); // 入力値を更新
  };

  const openAiBtn = async (e) => {
    e.preventDefault(); // フォーム送信を防ぐ

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.message);

      // レスポンスに応じてリダイレクト
      if (data.message.length > 0) {
        router.push(`/matching/result?response=${encodeURIComponent(data.message)}`);
      }
    } catch (error) {
      console.error('メッセージ送信に失敗しました:', error);
    }
  };

  return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">入力フォーム</h1>
      <form className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="入力してください"
        />
        <button
          onClick={openAiBtn}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default Page;
