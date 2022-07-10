export default function creatorOptions({token, upload, data, params}) {
    const options = {}
    if(token || upload) {
        options.headers = {}
    }
    if(token) {
        options.headers["x-access-token"] = localStorage.getItem("token")
    }
    if(upload) {
        options.headers["Content-Type"] = "multipart/form-data"
    }
    if(data) {
        options.data = data
    }
    if(params) {
        options.params = params
    }
    return options
}