import { InjectionKey, Ref } from 'vue'
import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/auth';
const config = require('@/enviroments/firebaseConfig.json')
const firebaseApp = firebase.initializeApp(config);

export const fb = firebase
export const storage = firebaseApp.storage()