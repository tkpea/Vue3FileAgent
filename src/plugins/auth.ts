import authApi from "@/plugins/firebaseAuth";

export interface  IAuth {
    googleLogin():void
    logout(): void
    me(): void
}
const auth:IAuth = authApi
export default auth
