import type { ReactNode } from "react"
import { Component } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div role="alert" className="p-4 text-red-600 bg-red-50 rounded">
          <h2 className="text-lg font-semibold">Что-то пошло не так</h2>
          <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
