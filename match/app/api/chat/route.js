import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// API キーが設定されているか確認するログ
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    // API キーの確認
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API キーが設定されていません');
    }

    const { message } = await request.json();

    // メッセージの確認
    if (!message) {
      return NextResponse.json(
        { error: 'メッセージは必須です' },
        { status: 400 }
      );
    }

    // リクエストの内容をログ出力
    console.log('Sending request to OpenAI:', { message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    // レスポンスの確認
    console.log('OpenAI response:', completion.choices[0].message);

    return NextResponse.json({
      message: completion.choices[0].message.content
    });

  } catch (error) {
    // より詳細なエラーログ
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: `エラーが発生しました: ${error.message}` },
      { status: 500 }
    );
  }
}