import { Navigation } from 'react-native-navigation';
import Storage from './Storage';
import axios from 'axios';

export class Register {

    static screen(name, component) {
        Navigation.registerComponent(name, () => component);
    }

}

export class Route {

    static async auth() {
        
    }

    static set(name) {
        Navigation.setRoot({
            root: {
                stack: {
                    children: [{
                        component: { id: name, name }
                    }]
                }
            }
        });
    }

    static open(parent, name, data = null) {
        Navigation.push(parent, {
            component: {
                name,
                passProps: {
                    data
                },
                options: {
                    animations: {
                        push: {
                            content: {
                                enabled: "true",
                                waitForRender: true,
                                alpha: {
                                    from: 0,
                                    to: 1,
                                    duration: 300,
                                    startDelay: 0
                                },
                            },
                        },
                        pop: {
                            content: {
                                enabled: "true",
                                waitForRender: true,
                                alpha: {
                                    from: 1,
                                    to: 0,
                                    duration: 300,
                                    startDelay: 0
                                },
                            },
                        }
                    }
                },
            }
        });
    }
}

export class Auth {
    
    static check() {       
        Storage.get('name').then(name => {
            if (name) return Route.set('Main'); 
            return Route.set('App'); 
        }); 
    }

} 
