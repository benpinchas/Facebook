export default {
    uploadImage
}

function uploadImage(ev) {
    const CLOUD_NAME = "benpinchas1"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'hj7a9uwm');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            return res.secure_url
        })
        .catch(err =>  {
            console.error(err) 
            throw err
        })
}
