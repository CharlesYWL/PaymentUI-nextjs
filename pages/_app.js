import { Provider } from 'react-redux';
import { store } from 'store';
import '../public/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

if (typeof window !== 'undefined') {
  require('jquery');
  require('popper.js');
  require('bootstrap');
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
