'use client'

// // app/page.js
// 'use client';

// // app/api/calculateMatch/route.js
// export async function POST(req) {
//   const { userInput, userTags } = await req.json();
  
//   // ユーザー入力からキーワードを抽出
//   const keywords = userInput.toLowerCase().split(/[\s,]+/);
  
//   // 各生徒との一致率を計算
//   const studentsWithMatch = students.map(student => {
//     let matchScore = 0;
//     let totalPoints = 0;
    
//     // プロフィールテキストの一致（40%のウェイト）
//     const profileText = student.profile.toLowerCase();
//     keywords.forEach(keyword => {
//       if (keyword.length > 1 && profileText.includes(keyword)) {
//         matchScore += 40 / keywords.length;
//       }
//     });
//     totalPoints += 40;
    
//     // タグの一致（60%のウェイト）
//     if (userTags.length > 0) {
//       const matchingTags = student.tags.filter(tag => userTags.includes(tag));
//       matchScore += (matchingTags.length / userTags.length) * 60;
//       totalPoints += 60;
//     }
    
//     // 総合的な一致率を計算
//     const matchRate = totalPoints > 0 ? (matchScore / totalPoints) * 100 : 0;
    
//     return {
//       ...student,
//       matchRate
//     };
//   });
  
//   // 一致率で降順ソート
//   const sortedStudents = studentsWithMatch
//     .sort((a, b) => b.matchRate - a.matchRate)
//     .filter(student => student.matchRate > 0);
  
//   return Response.json({ matchedStudents: sortedStudents });
// }

// import { useState } from 'react';

// const students = [
//   { id: 1, name: '田中太郎', tags: ['プログラミング', 'React'], profile: 'Reactが得意なフロントエンドエンジニア' },
//   { id: 2, name: '佐藤花子', tags: ['デザイン', 'UI/UX'], profile: 'UI/UXデザインを得意とする' },
//   { id: 3, name: '鈴木次郎', tags: ['バックエンド', 'Node.js'], profile: 'Node.jsを使ったバックエンド開発' },
//   { id: 4, name: '高橋一郎', tags: ['フロントエンド', 'React'], profile: 'フロントエンド開発、特にReactを使用' },
//   { id: 5, name: '中村美咲', tags: ['デザイン', 'Adobe XD'], profile: 'Adobe XDでプロトタイピングとデザインが得意' },
//   { id: 6, name: '渡辺翔太', tags: ['プログラミング', 'Python'], profile: 'Pythonを使用したデータサイエンスやAI開発' },
//   { id: 7, name: '伊藤優子', tags: ['UI/UX', 'フロントエンド'], profile: 'ユーザーインターフェースとユーザー体験のデザイン' },
//   { id: 8, name: '山田大輔', tags: ['バックエンド', 'Node.js'], profile: 'Node.jsを使ったAPI開発とサーバーサイド開発' },
//   { id: 9, name: '小林真理', tags: ['デザイン', 'UI/UX'], profile: 'UI/UXデザイン、ユーザー体験を最優先に' },
//   { id: 10, name: '松本賢治', tags: ['フロントエンド', 'JavaScript'], profile: 'JavaScriptを使用したフロントエンド開発' },
// ];

// export default function Home() {
//   const [userInput, setUserInput] = useState('');
//   const [userTags, setUserTags] = useState([]);
//   const [matchedStudents, setMatchedStudents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/calculateMatch', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userInput, userTags }),
//       });

//       const data = await response.json();
//       if (data.matchedStudents) {
//         setMatchedStudents(data.matchedStudents);
//       }
//     } catch (error) {
//       console.error('Error calculating matches:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const availableTags = [
//     'プログラミング', 'デザイン', 'React', 'UI/UX', 'Node.js',
//     'バックエンド', 'フロントエンド', 'Adobe XD'
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-3xl font-bold text-center mb-8">生徒プロフィールの一致率を計算</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-lg font-medium mb-2">
//               スキルや興味を入力:
//             </label>
//             <textarea
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="例: Reactでウェブアプリケーションを開発したい"
//               className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-medium mb-2">
//               関連するタグを選択:
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {availableTags.map(tag => (
//                 <button
//                   key={tag}
//                   type="button"
//                   onClick={() => {
//                     setUserTags(prev =>
//                       prev.includes(tag)
//                         ? prev.filter(t => t !== tag)
//                         : [...prev, tag]
//                     );
//                   }}
//                   className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                     userTags.includes(tag)
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//           >
//             {isLoading ? '計算中...' : '一致率を計算'}
//           </button>
//         </form>

//         {matchedStudents.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-2xl font-semibold mb-4">一致率が高い生徒:</h2>
//             <div className="space-y-4">
//               {matchedStudents.map((student) => (
//                 <div
//                   key={student.id}
//                   className="p-4 bg-white rounded-lg shadow border hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <h3 className="text-xl font-medium">{student.name}</h3>
//                       <p className="text-gray-600 mt-1">{student.profile}</p>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {student.tags.map(tag => (
//                           <span
//                             key={tag}
//                             className="px-2 py-1 bg-gray-100 text-sm rounded"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="ml-4 text-right">
//                       <span className="text-2xl font-bold text-blue-600">
//                         {student.matchRate.toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


























// 'use client' はクライアントコンポーネントとして動作させるために必要
// 'use client';

// import { useState } from 'react';

// // 仮の学生データ（API内で定義）
// const students = [
//   { id: 1, name: '田中太郎', tags: ['プログラミング', 'React'], profile: 'Reactが得意なフロントエンドエンジニア' },
//   { id: 2, name: '佐藤花子', tags: ['デザイン', 'UI/UX'], profile: 'UI/UXデザインを得意とする' },
//   { id: 3, name: '鈴木次郎', tags: ['バックエンド', 'Node.js'], profile: 'Node.jsを使ったバックエンド開発' },
// ];

// const calculateMatchRate = (userTags, studentTags) => {
//   const commonTags = userTags.filter(tag => studentTags.includes(tag));
//   return (commonTags.length / studentTags.length) * 100;
// };

// // メインのコンポーネント
// export default function Home() {
//   const [userInput, setUserInput] = useState('');
//   const [userTags, setUserTags] = useState([]);
//   const [matchedStudents, setMatchedStudents] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // API呼び出し（内部APIとして処理）
//     const matchedStudents = students.map(student => {
//       const matchRate = calculateMatchRate(userTags, student.tags);
//       return { ...student, matchRate };
//     });

//     // 一致率が高い順にソート
//     matchedStudents.sort((a, b) => b.matchRate - a.matchRate);

//     // 結果を設定
//     setMatchedStudents(matchedStudents);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold text-center mb-6">生徒プロフィールの一致率を計算</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">ユーザーの入力:</label>
//           <textarea
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//           />
//         </div>

//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">タグを選択:</label>
//           <select
//             multiple
//             onChange={(e) => setUserTags([...e.target.selectedOptions].map(o => o.value))}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="プログラミング">プログラミング</option>
//             <option value="デザイン">デザイン</option>
//             <option value="React">React</option>
//             <option value="UI/UX">UI/UX</option>
//             <option value="Node.js">Node.js</option>
//             <option value="バックエンド">バックエンド</option>
//             <option value="フロントエンド">フロントエンド</option>
//             <option value="Adobe XD">Adobe XD</option>
//           </select>
//         </div>

//         <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
//           一致率を計算
//         </button>
//       </form>

//       {matchedStudents.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-semibold mb-4">一致率が高い順:</h2>
//           <ul className="space-y-3">
//             {matchedStudents.map((student) => (
//               <li key={student.id} className="p-4 bg-gray-100 rounded-md shadow-md">
//                 <p className="font-medium">{student.name}</p>
//                 <p className="text-sm text-gray-600">一致率: {student.matchRate.toFixed(2)}%</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }













import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResponse(data.message);

    } catch (error) {
      console.error(error);
      setResponse('エラーが発生しました');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-3xl font-bold text-center text-white mb-6">AI チャットボット</h1>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力してください"
          className="w-full p-4 border-2 border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xl"
        />

        <button
          onClick={sendMessage}
          className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-pink-600 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition duration-300"
        >
          送信
        </button>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">AIの返答:</h3>
          <p className="mt-2 text-lg text-gray-800">{response}</p>
        </div>
      </div>
    </div>
  );
}
