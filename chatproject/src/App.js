import { BrowserRouter } from 'react-router-dom';
import { PagesRoutes } from './pagesRoutes';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");
function App() {

  return (
    <BrowserRouter >
      <PagesRoutes
        socket={socket}
      />
    </BrowserRouter>
  );
}

export default App;
