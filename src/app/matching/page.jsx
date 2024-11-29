'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const arase = async () => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.message);

      if (data.message.length > 0) {
        router.push(`/matching/choice?response=${encodeURIComponent(data.message)}`);
      }

    } catch (error) {
      console.error('メッセージ送信に失敗しました:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力してください"
          className="w-full p-4 border-2 border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xl"
        />

        <button
          onClick={arase}
          className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-pink-600 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition duration-300"
        >
          送信
        </button>

      </div>
    </div>
  );
}
