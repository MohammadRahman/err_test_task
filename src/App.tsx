import Homepage from './pages/home/homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <Homepage/>
    </QueryClientProvider>
  )
}

export default App;
