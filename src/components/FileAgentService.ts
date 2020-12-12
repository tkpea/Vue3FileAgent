export function readImage(file: File) :Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            if(!event.target) {
                resolve(null)
                return
            }
            resolve(event.target.result)
        }
        reader.readAsDataURL(file)

    })
}