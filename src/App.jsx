import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ErrorElement from './components/ErrorElement';
import Reels from './pages/Reels';
import TVStations from './pages/TVStations';
import RadioStations from './pages/RadioStations';
import Root from './pages/Root';
import LiquidityPools from './pages/LiquidityPools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Upload from './pages/Upload';


const queryClient = new QueryClient({});
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'reels',
        element: <Reels />,
      },
      {
        path: 'tv stations',
        element: <TVStations />,
      },
      {
        path: 'radio stations',
        element: <RadioStations />,
      },
      {
        path: 'uploads',
        element: <Upload/>,
      },
      {
        path: 'liquidity pools',
        element: <LiquidityPools />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
