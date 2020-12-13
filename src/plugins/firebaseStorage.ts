import {storage, fb} from './firebase'
import { IStorage } from './storage'
const storageApi: IStorage = {
    load: () => {


    },
    remove: (file: File, directory: string) => {
        return new Promise((resolve, reject) => {
            const storageRef = storage.ref();
            const desertRef = storageRef.child(`${directory}/${file.name}`);
            desertRef.delete()
                .then((res) => {
                    console.log({res})
                    resolve(true)
                })
                .catch(error => {
                    console.error(error)
                    reject(error)
                })
        })
    },
    create: (file: File, directory: string) => {
        return new Promise((resolve, reject) => {
            const storageRef = storage.ref();
            const ref = storageRef.child(`${directory}/${file.name}`);
            const uploadTask = ref.put(file)

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case fb.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case fb.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            reject(error)
                            break;
                        case 'storage/canceled':
                            reject(error)
                            break;
                        case 'storage/unknown':
                            reject(error)
                            break;
                    }
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL)
                    });
                }
            )
        })

    }
};

export default storageApi