import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Table = ({
    children,
    header = [],
    handleSearch,
}) => {
    return (
        <>
            <div className="flex justify-end mb-2">
                {/* <div className="col-span-1">
                    <label className="relative block flex">
                        <label htmlFor="" className="my-auto mr-2">Show</label>
                        <select
                            className="form-select appearance-none
                            block
                            w-1/2
                            px-4
                            py-1.5
                            text-base
                            font-normal
                            text-neutral-200
                            bg-primary-900/[0.2] bg-clip-padding bg-no-repeat
                            border border-solid border-primary-900
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-neutral-200 focus:bg-primary-900/[0.6] focus:border-primary-900 focus:outline-none"
                            aria-label="Default select example">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <label htmlFor="" className="my-auto ml-2">Row</label>
                    </label>
                </div> */}
                <div className="col-span-2 md:col-span-1">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <FontAwesomeIcon icon={faSearch} color="white" />
                        </span>
                        <input className="placeholder:italic placeholder:text-slate-400 block  w-full border border-primary-900 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none bg-primary-900/[0.2] focus:border-primary-900 focus:ring-primary-500 focus:ring-1 text-sm" placeholder="Search for anything..." type="text" onKeyDown={(e) => { (e.key === 'Enter' ? handleSearch(e.target.value) : null) }} />
                    </label>
                </div>
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-0 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-primary-900 to-secondary-800 border-b">
                                <tr>
                                    {header && header.map((row, index) => {
                                        return (
                                            <th key={index} scope="col" className="text-sm font-medium text-neutral-200 px-6 py-4 text-left">
                                                {row}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {children.toString() == 'false' ? (
                                    <tr className="bg-primary-900/[0.2] border-b transition duration-300 ease-in-out hover:bg-primary-900/[0.6]">
                                        <td colSpan={header.length} className="text-sm text-neutral-200 font-light px-6 py-4 whitespace-nowrap text-center">Data Tidak Ditemukan</td>
                                    </tr>
                                ) : children}
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-200">1</td> */}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table