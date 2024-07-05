import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import ReactPost from './pages/ReactPost';
import './App.css'
import JsonPosts from './pages/JsonPosts';
import Dependent from './pages/Dependent';
import Page from './pages/Page';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Page />} />
          <Route path="/dependent" element={<Dependent />} />
          <Route path="/json-server" element={<JsonPosts />} />
          <Route path="/react-query" element={<Posts />} />
          <Route path="/react" element={<ReactPost />} />
        </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App;
