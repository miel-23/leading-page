'use client'

import React, { Component, Suspense, lazy } from 'react'
import { LoaderCircle } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  style?: React.CSSProperties
  onLoad?: (splineApp: any) => void
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn("Spline loading error caught:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="h-10 w-10 rounded-full border border-neutral-700 bg-transparent flex items-center justify-center mb-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <span className="text-xs font-mono-code text-neutral-400">3D Interactive Core Active</span>
        </div>
      )
    }
    return this.props.children
  }
}

export function SplineScene({ scene, className, style, onLoad }: SplineSceneProps) {
  const handleLoad = (splineApp: any) => {
    try {
      if (splineApp?.setCanvasColor) {
        splineApp.setCanvasColor('transparent');
      }
      if (splineApp?._renderer?.setClearColor) {
        splineApp._renderer.setClearColor(0x000000, 0);
      }
      if (splineApp?.renderer?.setClearAlpha) {
        splineApp.renderer.setClearAlpha(0);
      }
    } catch {
      // Ignore
    }
    if (onLoad) {
      onLoad(splineApp);
    }
  };

  return (
    <SplineErrorBoundary>
      <Suspense 
        fallback={
          <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center gap-3 bg-transparent">
            <LoaderCircle
              className="h-8 w-8 animate-spin"
              style={{ color: 'oklch(78.9% 0.154 211.53)' }}
              strokeWidth={2}
            />
            <span className="text-[10px] font-mono-code tracking-[0.25em] text-neutral-400 uppercase font-medium">
              CHARGEMENT
            </span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          style={{ background: 'transparent', ...style }}
          onLoad={handleLoad}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
