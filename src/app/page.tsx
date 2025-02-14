import Link from 'next/link';
import { Inter } from 'next/font/google'
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';

const montserrat = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center h-screen max-w-[980px] mx-auto p-4 gap-10">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
      <section className='flex flex-col gap-6'>
        <div>
          <h1 className={`text-7xl text-center font-semibold text-black dark:text-white ${montserrat.className}`}>BIENVIDO A</h1>
          <TypingAnimation className='text-9xl text-center text-primary' duration={400}>RESERVI</TypingAnimation>
        </div>
        <p className='text-2xl text-center w-[560px]'>Reservi es una aplicación web que te permite <span className='font-bold'>crear y gestionar</span> tus reservas de tiempo en línea.</p>
      </section>
      <Link href="/dashboard">
        <RainbowButton>Acceder al dashboard</RainbowButton>
      </Link>
    </main>
  );
}
