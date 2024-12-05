'use client'

import React, { useState, useEffect, useRef } from 'react';
import { client } from '../../../libs/microcms';
import { useSearchParams } from 'next/navigation';
import supabase from '../../supabase'; // Supabaseクライアントをインポート
import QRCode from 'react-qr-code'; // react-qr-codeライブラリをインポート
import html2canvas from 'html2canvas'; // html2canvasをインポート

export default function ChoicePage() {
  // もらった情報取得
  const searchParams = useSearchParams();
  const message = searchParams.get('response');

  const [userData, setUserData] = useState([]);
  const [sortedIndices, setSortedIndices] = useState(JSON.parse(message));
  const [imageUrl, setImageUrl] = useState(null); // アップロード後の画像URLを保存するためのstate
  const [uploading, setUploading] = useState(false); // アップロード中の状態管理
  const captureRef = useRef(null); // スクリーンショットを撮るための参照

  useEffect(() => {
    const fetchData = async () => {
      const data = (await client.get({ endpoint: process.env.MICROCMS_SERVICE_DOMAIN })).contents;
      setUserData(data);
    };
    fetchData();
  }, []);

  // スクリーンショットを撮る
  const handleScreenshot = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current); // 画面をキャプチャ
      const imageDataUrl = canvas.toDataURL(); // Data URL形式で画像を取得
      uploadImage(imageDataUrl); // 画像をSupabaseにアップロード
    }
  };

  // 画像をSupabaseにアップロード
  const uploadImage = async (imageDataUrl) => {
    setUploading(true);

    // Data URLをBlobに変換
    const blob = dataURLtoBlob(imageDataUrl);
    const fileName = `screenshots/${Date.now()}_screenshot.png`; // ユニークなファイル名を作成

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('screenshots') // 使用するバケット名を指定
      .upload(fileName, blob);

    if (error) {
      console.error('Error uploading file:', error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from('screenshots')
        .getPublicUrl(fileName); // 公開URLを取得
      setImageUrl(urlData.publicUrl); // 公開URLをstateに保存
    }

    setUploading(false);
  };

  // Data URLをBlobに変換する関数
  const dataURLtoBlob = (dataUrl) => {
    const [header, base64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const length = binary.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < length; i++) {
      view[i] = binary.charCodeAt(i);
    }

    return new Blob([view], { type: mime });
  };

  return (
<div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
  {userData.length > 0 ? (
    <div ref={captureRef} className="w-full">
      {sortedIndices.map(e => (
        <div key={e} className="bg-white p-6 m-4 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl">
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-800">{userData[e - 1].number}</p>
            <p className="text-xl font-semibold text-gray-800">{userData[e - 1].name}</p>
          </div>
        </div>
      ))}
      <button onClick={handleScreenshot} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        スクリーンショットを撮る
      </button>

      {uploading && <p className="text-white text-xl mt-4">アップロード中...</p>} {/* アップロード中のメッセージ */}

      {imageUrl && (
        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-white text-2xl md:text-3xl font-semibold">保存した画像のQRコード</h3>
          <div className="mt-4">
            <QRCode value={imageUrl} size={256} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="text-white text-2xl font-bold">データを読み込み中...</p>
  )}
</div>

  );
}