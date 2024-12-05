import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { client } from '../../../libs/microcms'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {

  const data = (await client.get({ endpoint: process.env.MICROCMS_SERVICE_DOMAIN })).contents;

  const body = await request.json();
  const { formText1, formText2, formText3 } = body;

  const prompt = `
    学生情報:
      ${data.map(e => `
        番号:${e.number},
        名前:${e.name},
        希望職種:${e.job},
        特徴: ${[
          e.features.features1,
          e.features.features2,
          e.features.features3,
          e.features.features4
        ].join(', ')},
        将来設計:${e.futureDesign},
        課題説明:${e.assignExpl},`)
      .join('\n')}
    以下の情報を元に当てはまる学生を三人選んでください。
    ${formText1}${formText2}${formText3}
    また、条件として番号を[番号,番号,]の配列に入れて配列だけを教えてください。
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: 'あなたは優秀な推薦アシスタントです。' },
      { role: 'user', content: prompt },
    ],
  });

  return NextResponse.json({
    message: completion.choices?.[0]?.message?.content || '結果が見つかりませんでした。',
  });
}