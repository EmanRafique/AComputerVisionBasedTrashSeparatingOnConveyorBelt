/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { enableLayoutAnimations } from 'react-native-reanimated'; // Required for Bridgeless Mode
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

enableLayoutAnimations(true); // Enables Reanimated animations in Bridgeless Mode

AppRegistry.registerComponent(appName, () => App);
