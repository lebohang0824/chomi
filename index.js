import { Navigation } from 'react-native-navigation';
import { Auth, Register } from './src/services/Router';


// Bootstrap app routes
import App from './src/App';
import Main from './src/Main';

// Register
Register.screen('App', App);
Register.screen('Main', Main);

Navigation.events().registerAppLaunchedListener(async () => {
    Auth.check();
});