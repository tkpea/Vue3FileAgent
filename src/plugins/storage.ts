
import storageApi from "@/plugins/firebaseStorage";

export interface  IStorage {
    load(): void
    remove(file: File, directory: string): void
    create(file: File, directory: string): void
}
const storage:IStorage = storageApi
export default storage
