import Head from "next/head";
import "tailwindcss/tailwind.css";
import { MainPanel } from "components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Gen Flashcard App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center">
        <MainPanel />
      </main>

      <footer></footer>
    </div>
  );
}
