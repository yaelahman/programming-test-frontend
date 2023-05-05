import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <div className="mx-auto text-center h-full my-20">
                <h1 className="uppercase text-lg">Mohon Maaf !</h1>
                <h5 className="text-xs mb-4">Halaman yang anda tuju tidak ditemukan.</h5>
                <Link to="/" className="rounded-full px-6 py-2 bg-primary-800 hover:bg-primary-900">
                    Kembali
                </Link>
            </div>
        </>
    )
}

export default NotFoundPage