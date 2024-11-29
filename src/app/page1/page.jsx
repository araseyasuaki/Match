import Link from 'next/link';

export default function Page1() {
  const message = "Hello from Page1!";

  return (
    <div>
      <h1>Page 1</h1>
      <p>Click the link to go to Page 2 with a message.</p>
      <Link href={`/page2?message=${encodeURIComponent(message)}`}>
        Go to Page 2
      </Link>
    </div>
  );
}