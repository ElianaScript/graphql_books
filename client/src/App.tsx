import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
  
    </ApolloProvider>
  );
}

export default App;
