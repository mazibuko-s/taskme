import Head from "next/head";
import Homepage from "./homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Task.Me</title>
        <meta name="description" content="Task everybory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#003a00] to-[#15162c]">
       <Homepage/>
      </main>
    </>
  );
}
