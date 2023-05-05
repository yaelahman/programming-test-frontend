const Pagination = ({
    currentPage,
    handlePagination,
    lastPage
}) => {
    return (
        <nav className="bg-primary-900/[0.2] py-2 px-4 rounded-lg">
            <ul className="flex list-style-none justify-end">
                {currentPage != 1 && (
                    <li className="page-item my-auto disabled">
                        <button
                            onClick={() => handlePagination(currentPage - 1)}
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-neutral-200 hover:text-neutral-200 hover:bg-primary-900/[0.6] focus:shadow-none text-sm"
                        >Previous</button>
                    </li>
                )}
                <li className="page-item my-auto active">
                    <button
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-secondary-800 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-secondary-800 shadow-md focus:shadow-md text-sm"
                    >{currentPage} <span className="visually-hidden">(current)</span></button>
                </li>
                {currentPage != lastPage && (
                    <li className="page-item my-auto">
                        <button
                            onClick={() => handlePagination(currentPage + 1)}
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-neutral-200 hover:text-neutral-200 hover:bg-primary-900/[0.6] focus:shadow-none text-sm"
                        >Next</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Pagination