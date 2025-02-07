import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center h-screen max-w-[980px] mx-auto p-4 gap-4">
      <h1 className="text-4xl font-bold">Welcome to Reservi!</h1>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
