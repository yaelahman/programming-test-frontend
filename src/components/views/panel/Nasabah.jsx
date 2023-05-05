import Pagination from "../../table/Pagination";
import Table from "../../table/Table";
import { useCallback, useEffect, useState } from "react";
import { rupiah } from "../../../helper";
import { Link } from "react-router-dom";
import { DeleteNasabah, GetNasabah, MakeNasabah } from "../../../controllers/nasabah";
import Input from "../../form/Input"
import { toast } from "react-toastify";

const Nasabah = () => {
    const [showModal, setShowModal] = useState(false)
    const [nasabah, setNasabah] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState(null)

    const SyncNasabah = async (currentPage = page, currentSearch = search) => {
        setPage(currentPage)
        setSearch(currentSearch)

        await GetNasabah({
            page: currentPage,
            search: currentSearch
        }).then((resp) => {
            setNasabah(resp.data)
        })
    }

    const handlePagination = useCallback((val) => {
        SyncNasabah(val)
    })

    const handleSearch = useCallback((val) => {
        SyncNasabah(page, val)
    })

    const handleAddNasabah = async (e) => {
        e.preventDefault()
        setShowModal(false)

        await MakeNasabah({
            id: id,
            name: name
        }).then((resp) => {
            if (resp.success) {
                toast.success(resp.message)
                SyncNasabah()
            } else {
                toast.error(resp.message)
            }
        })

        setId('')
        setName('')
    }

    const handleEdit = (val) => {
        setId(val.id)
        setName(val.name)

        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await DeleteNasabah(id)
            .then((resp) => {
                if (resp.success) {
                    toast.success(resp.message)
                } else {
                    toast.error(resp.message)
                }
            })

        SyncNasabah()
    }

    useEffect(() => {
        SyncNasabah()
    }, [])
    return (
        <>

            <div className="container mx-auto md:px-8 px-4">
                {showModal ? (
                    <>
                        <form onSubmit={handleAddNasabah} className="shadow-md rounded w-full">
                            <div className={"flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/[0.2]"}>
                                <div className="relative w-full my-6 mt-8 mx-auto md:max-w-xl max-w-md">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-900 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-neutral-300 rounded-t ">
                                            <h3 className="text-md font-semibold">Tambah Nasabah</h3>
                                        </div>
                                        <div className="relative sm:p-6 py-4 flex-auto">
                                            <div className="mb-4">
                                                <label htmlFor="">Nama</label>
                                                <Input required={true} value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center p-6 border-t border-solid border-blueneutral-200 rounded-b">

                                            <button
                                                className="disabled:bg-neutral-600 text-white bg-red-700 hover:bg-red-800 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none text-xs mr-1 mb-1"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Batal
                                            </button>
                                            <button
                                                className="disabled:bg-neutral-600 text-white bg-primary-700 hover:bg-primary-800 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none text-xs mr-1 mb-1"
                                                type="submit"
                                            >
                                                Tambah
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                ) : null}
                <div className="text-center">
                    <h2 className="font-medium leading-tight text-2xl text-neutral-200 shadow-sm mb-8 uppercase">Data Nasabah</h2>
                    <div className="">
                        <div className="col-span-2 bg-[#111827] p-4 rounded-lg">
                            <div className="flex justify-end mb-2">
                                <button onClick={() => setShowModal(true)} className="bg-primary-600 hover:bg-primary-700 rounded text-sm px-4 py-2">
                                    Tambah Nasabah
                                </button>
                            </div>
                            <Table
                                header={['Nasabah ID', 'Nama', 'Aksi']}
                                handleSearch={handleSearch}
                            >
                                {nasabah?.data?.length > 0 && nasabah.data.map((row, index) => {
                                    return (
                                        <tr key={index} className="bg-primary-900/[0.2] border-b transition duration-300 ease-in-out hover:bg-primary-900/[0.6]">
                                            <td className="text- w-[20%] text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.id}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.name}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">

                                                <button onClick={() => handleEdit(row)} className="bg-yellow-900 px-3 py-1 hover:bg-yellow-600 rounded">
                                                    Ubah
                                                </button>
                                                &nbsp;
                                                <button onClick={() => handleDelete(row.id)} className="bg-red-900 px-3 py-1 hover:bg-red-600 rounded">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </Table>
                            <Pagination
                                currentPage={page}
                                lastPage={nasabah?.last_page ?? 1}
                                handlePagination={handlePagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nasabah