import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--desktop-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1300,
          height: 'calc(100vh - 80px)',
          minHeight: 520,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        <Terminal />
      </div>
    </main>
  );
}
