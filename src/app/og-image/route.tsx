import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export async function GET(request: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient accents */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            zIndex: 1,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '64px',
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
            }}
          >
            CC
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0',
              letterSpacing: '-2px',
              textAlign: 'center',
            }}
          >
            Claude Code
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 36,
              color: '#9ca3af',
              margin: '0',
              fontWeight: '400',
            }}
          >
            Run for FREE with NVIDIA NIM
          </p>

          {/* Badge */}
          <div
            style={{
              marginTop: '20px',
              padding: '12px 32px',
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '12px',
              fontSize: 24,
              color: '#60a5fa',
              fontWeight: '500',
            }}
          >
            No Credit Card Required
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 20,
              color: '#6b7280',
            }}
          >
            <span>claudecodefree.dev</span>
            <span>•</span>
            <span>Free AI Coding Assistant</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
