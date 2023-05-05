import axios from "axios"

const GetTransaction = async (params) => {
    return await axios.get(import.meta.env.VITE_API_URL + "/transaction/get", {
        params: {
            ...params
        }
    })
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

const MakeTransaction = async (data) => {
    return await axios.post(import.meta.env.VITE_API_URL + "/transaction/make", data)
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

const DeleteTransaction = async (id) => {
    return await axios.delete(import.meta.env.VITE_API_URL + "/transaction/delete/" + id)
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

export {
    GetTransaction,
    MakeTransaction,
    DeleteTransaction
}