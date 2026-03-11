import type { ReactNode } from 'react'
import { Component } from 'react'
import { Button } from './Button'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  reset = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
          <h2 className="text-lg font-semibold text-slate-900">Something went wrong</h2>
          <p className="max-w-md text-center text-sm text-slate-600">
            {this.state.error.message}
          </p>
          <Button onClick={this.reset}>Try again</Button>
        </div>
      )
    }
    return this.props.children
  }
}
