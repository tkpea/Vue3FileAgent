import { auth, fb } from './firebase'
import { IAuth } from './auth'
import {IUser} from "@/store";
import store from '@/store'

const authApi:IAuth = {
    googleLogin: () => {
        const provider = new fb.auth.GoogleAuthProvider()
        return new Promise((resolve, reject) => {
            auth.signInWithPopup(provider).then(res => {
                console.log(res)
                const user: IUser = {
                    displayName: res.user?.displayName as string,
                    email: res.user?.email as string,
                    uid: res.user?.uid,
                    photoURL: res.user?.photoURL as string,
                    refreshToken: res.user?.refreshToken
                }
                store.commit('SET_USER', user)
                resolve(res)

            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            auth.signOut().then(function() {
                // Sign-out successful.
                store.commit('SET_USER', null)
                resolve(true)
            }).catch((error: Error) => {
                // An error happened.
                reject(error)
            });
        })
    },
    me: () => {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged((res) => {
                if(res?.displayName) {
                    const user: IUser = {
                        displayName: res?.displayName as string,
                        email: res?.email as string,
                        uid: res?.uid,
                        photoURL: res?.photoURL as string,
                        refreshToken: res?.refreshToken
                    }
                    store.commit('SET_USER', user)
                    resolve(user)
                }
                resolve(null)
            })
        });

    }

}
export default authApi