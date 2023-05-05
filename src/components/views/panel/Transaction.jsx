import Pagination from "../../table/Pagination";
import Table from "../../table/Table";
import { useCallback, useEffect, useState } from "react";
import { rupiah } from "../../../helper";
import { Link } from "react-router-dom";
import Input from "../../form/Input"
import Dropdown from "../../form/Dropdown"
import { toast } from "react-toastify";
import { DeleteTransaction, GetTransaction, MakeTransaction } from "../../../controllers/transaction";
import { GetNasabah } from "../../../controllers/nasabah";

const Transaction = () => {
    const [showModal, setShowModal] = useState(false)
    const [transaction, setTransaction] = useState([])
    const [nasabah, setNasabah] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [id, setId] = useState(null)
    const [nasabahId, setNasabahId] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('')
    const [amount, setAmount] = useState(0)

    const SyncTransaction = async (currentPage = page, currentSearch = search) => {
        setPage(currentPage)
        setSearch(currentSearch)

        await GetTransaction({
            page: currentPage,
            search: currentSearch
        }).then((resp) => {
            setTransaction(resp.data)
        })
    }

    const handlePagination = useCallback((val) => {
        SyncTransaction(val)
    })

    const handleSearch = useCallback((val) => {
        SyncTransaction(page, val)
    })

    const handleAddTransaction = async (e) => {
        e.preventDefault()
        setShowModal(false)

        await MakeTransaction({
            id: id,
            nasabah_id: nasabahId,
            description: description,
            transaction_date: date,
            debit_credit_status: status,
            amount: amount,
        }).then((resp) => {
            if (resp.success) {
                toast.success(resp.message)
                SyncTransaction()
            } else {
                toast.error(resp.message)
            }
        })

        setId('')
        setNasabahId('')
        setDescription('')
        setDate('')
        setStatus('')
    }

    const handleEdit = (val) => {
        setId(val.id)
        setNasabahId(val.nasabah_id)
        setDescription(val.description)
        setDate(val.transaction_date)
        setStatus(val.status_debit_credit)

        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await DeleteTransaction(id)
            .then((resp) => {
                if (resp.success) {
                    toast.success(resp.message)
                } else {
                    toast.error(resp.message)
                }
            })

        SyncTransaction()
    }

    useEffect(() => {
        SyncTransaction()
        GetNasabah({
            isAll: true
        }).then((resp) => {
            setNasabah(resp.data)
        })
    }, [])
    return (
        <>

            <div className="container mx-auto md:px-8 px-4">
                {showModal ? (
                    <>
                        <form onSubmit={handleAddTransaction} className="shadow-md rounded w-full">
                            <div className={"flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/[0.2]"}>
                                <div className="relative w-full my-6 mt-8 mx-auto md:max-w-xl max-w-md">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-900 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-neutral-300 rounded-t ">
                                            <h3 className="text-md font-semibold">Tambah Transaksi</h3>
                                        </div>
                                        <div className="relative sm:p-6 py-4 flex-auto">
                                            <div className="mb-4">
                                                <label htmlFor="">Nasabah</label>
                                                <Dropdown placeholder="Pilih Nasabah" options={nasabah} onChange={(e) => setNasabahId(e.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="">Deskripsi</label>
                                                <Input required={true} value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="">Tanggal Transaksi</label>
                                                <Input type="date" required={true} value={date} onChange={(e) => setDate(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="">Status</label>
                                                <Dropdown placeholder="Pilih Debit/Credit" options={[
                                                    { value: 'C', label: 'Credit' },
                                                    { value: 'D', label: 'Debit' }
                                                ]} onChange={(e) => setStatus(e.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="">Harga</label>
                                                <Input type="number" required={true} value={amount} onChange={(e) => setAmount(e.target.value)} />
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
                    <h2 className="font-medium leading-tight text-2xl text-neutral-200 shadow-sm mb-8 uppercase">Data Transaksi</h2>
                    <div className="">
                        <div className="col-span-2 bg-[#111827] p-4 rounded-lg">
                            <div className="flex justify-end mb-2">
                                <button onClick={() => setShowModal(true)} className="bg-primary-600 hover:bg-primary-700 rounded text-sm px-4 py-2">
                                    Tambah Transaksi
                                </button>
                            </div>
                            <Table
                                header={['Nasabah ID', 'Nama', 'Deskripsi', 'Tanggal', 'Debit Credit', 'Harga', 'Aksi']}
                                handleSearch={handleSearch}
                            >
                                {transaction?.data?.length > 0 && transaction.data.map((row, index) => {
                                    return (
                                        <tr key={index} className="bg-primary-900/[0.2] border-b transition duration-300 ease-in-out hover:bg-primary-900/[0.6]">
                                            <td className="text- w-[20%] text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.nasabah_id}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.nasabah.name}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.description}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.transaction_date}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.debit_credit_status}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {rupiah(row.amount)}
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
                                lastPage={transaction?.last_page ?? 1}
                                handlePagination={handlePagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transaction