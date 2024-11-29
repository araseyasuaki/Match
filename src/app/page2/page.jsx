'use client'

import { useSearchParams } from 'next/navigation';

export default function Page2() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div>
      <h1>Page 2</h1>
      <p>Received message: {message || 'No message'}</p>
    </div>
  );
}