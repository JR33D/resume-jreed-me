import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="terminal-outer">
      <div className="terminal-window">
        <Terminal />
      </div>
    </main>
  );
}
