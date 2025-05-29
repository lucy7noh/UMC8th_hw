import { Provider } from 'react-redux'
import './App.css';
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import store from './store/store';
import Modal from './components/Modal';

function App() {
 return (
  <Provider store={store}>
  <Navbar />
  <CartList />
  <PriceBox />
  <Modal />
  </Provider>
 );
}

export default App;
