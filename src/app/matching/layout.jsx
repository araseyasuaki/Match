'use client'

import { useState } from 'react';
import Page from './page'; // page.jsxをインポート
import Choice from './choice'; // choice.jsxをインポート

export default function Layout() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
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

    } catch (error) {
      console.error('メッセージ送信に失敗しました:', error);
    }
  };

  return (
    <div>

      {response ?
        <Choice
          response={response}
        />
        // <Page
        //   message={message}
        //   setMessage={setMessage}
        //   sendMessage={sendMessage}
        //   response={response}
        // />
        :
        <Page
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          response={response}
        />
        // <Choice
        //   response={response}
        // />
      }

    </div>
  );
}
