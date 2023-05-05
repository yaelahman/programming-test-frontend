import axios from "axios"

const GetNasabah = async (params) => {
    return await axios.get(import.meta.env.VITE_API_URL + "/nasabah/get", {
        params: {
            ...params
        }
    })
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

const GetNasabahPoint = async (params) => {
    return await axios.get(import.meta.env.VITE_API_URL + "/nasabah/get-point", {
        params: {
            ...params
        }
    })
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}
const GetNasabahReport = async (params) => {
    return await axios.get(import.meta.env.VITE_API_URL + "/nasabah/get-report", {
        params: {
            ...params
        }
    })
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

const MakeNasabah = async (data) => {
    return await axios.post(import.meta.env.VITE_API_URL + "/nasabah/make", data)
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

const DeleteNasabah = async (id) => {
    return await axios.delete(import.meta.env.VITE_API_URL + "/nasabah/delete/" + id)
        .then((resp) => resp.data)
        .catch((e) => {
            return false
        })
}

export {
    GetNasabah,
    GetNasabahPoint,
    MakeNasabah,
    DeleteNasabah,
    GetNasabahReport
}