'use client';

// Last-resort boundary for errors thrown in the root layout itself.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          background: '#100f10',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 32, margin: 0 }}>Something went wrong</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Please refresh the page or try again shortly.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#9e221a',
            color: '#fff',
            border: 0,
            borderRadius: 999,
            padding: '12px 28px',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
