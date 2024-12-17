'use client'
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='h-screen flex justify-center items-center gap-10'>
      <div className='w-52 h-32 bg-red-400 rounded-3xl'>
        <Link href='/matching' className='w-full h-full flex justify-center items-center text-white'>
          マッチング
        </Link>
      </div>
    </div>
  );
}

export default Home;
