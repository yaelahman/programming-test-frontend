import Pagination from "../../table/Pagination";
import Table from "../../table/Table";
import { useCallback, useEffect, useState } from "react";
import { GetNasabah, GetNasabahReport } from "../../../controllers/nasabah";
import Dropdown from "../../form/Dropdown"
import Input from "../../form/Input"
import { rupiah } from "../../../helper";

const NasabahReport = () => {
    const [nasabah, setNasabah] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [nasabahId, setNasabahId] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [nasabahDropdown, setNasabahDropdown] = useState([])

    const SyncNasabah = async (currentPage = page, currentSearch = search) => {
        setPage(currentPage)
        setSearch(currentSearch)

        await GetNasabahReport({
            nasabah_id: nasabahId,
            dateStart: dateStart,
            dateEnd: dateEnd,
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

    const handleFilter = () => {
        SyncNasabah()
    }

    useEffect(() => {
        GetNasabah({
            isAll: true
        }).then((resp) => {
            setNasabahDropdown(resp.data)
        })
    }, [])
    return (
        <>

            <div className="container mx-auto md:px-8 px-4">
                <div className="text-center">
                    <h2 className="font-medium leading-tight text-2xl text-neutral-200 shadow-sm mb-8 uppercase">Data Nasabah</h2>
                    <div className="">
                        <div className="bg-[#111827] p-4 rounded-lg">
                            <div className="flex justify-start">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="mb-2">
                                        <label htmlFor="">Nasabah</label>
                                        <Dropdown placeholder="Pilih Nasabah" options={nasabahDropdown} onChange={(e) => setNasabahId(e.value)} />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="">Tanggal Mulai</label>
                                        <Input type="date" required={true} value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="">Tanggal Selesai</label>
                                        <Input type="date" min={dateStart} disabled={dateStart == ''} required={true} value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <button onClick={() => handleFilter()} disabled={nasabahId == '' || dateStart == '' || dateEnd == ''} className="disabled:bg-gray-600 bg-yellow-600 hover:bg-yellow-700 px-12 py-2 rounded mt-auto">Cari</button>
                            </div>
                            <Table
                                header={['Tanggal Transaksi', 'Deskripsi', 'Debit', 'Credit', 'Jumlah']}
                                handleSearch={handleSearch}
                            >
                                {nasabah?.data?.length > 0 && nasabah.data.map((row, index) => {
                                    return (
                                        <tr key={index} className="bg-primary-900/[0.2] border-b transition duration-300 ease-in-out hover:bg-primary-900/[0.6]">
                                            <td className="text- w-[20%] text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.transaction_date}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.description}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {row.debit_credit_status == 'D' ? rupiah(row.amount) : '-'}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">

                                                {row.debit_credit_status == 'C' ? rupiah(row.amount) : '-'}
                                            </td>
                                            <td className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap">
                                                {rupiah(row.amount)}
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

export default NasabahReport