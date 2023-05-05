import Pagination from "../../table/Pagination";
import Table from "../../table/Table";
import { useCallback, useEffect, useState } from "react";
import { GetNasabahPoint } from "../../../controllers/nasabah";

const NasabahPoint = () => {
    const [nasabah, setNasabah] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const SyncNasabah = async (currentPage = page, currentSearch = search) => {
        setPage(currentPage)
        setSearch(currentSearch)

        await GetNasabahPoint({
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

    useEffect(() => {
        SyncNasabah()
    }, [])
    return (
        <>

            <div className="container mx-auto md:px-8 px-4">
                <div className="text-center">
                    <h2 className="font-medium leading-tight text-2xl text-neutral-200 shadow-sm mb-8 uppercase">Data Nasabah</h2>
                    <div className="">
                        <div className="col-span-2 bg-[#111827] p-4 rounded-lg">
                            <Table
                                header={['Nasabah ID', 'Nama', 'Total Point']}
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
                                                {row.total_point}
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

export default NasabahPoint