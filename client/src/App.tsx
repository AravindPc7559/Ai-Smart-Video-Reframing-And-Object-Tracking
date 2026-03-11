import { Providers } from '@/app/providers'
import { AppRouter } from '@/app/router'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { ToastContainer } from '@/shared/components/Toast'

function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <AppRouter />
        <ToastContainer />
      </Providers>
    </ErrorBoundary>
  )
}

export default App
