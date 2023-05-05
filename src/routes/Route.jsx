import Nasabah from "../components/views/panel/Nasabah"
import NasabahPoint from "../components/views/panel/NasabahPoint"
import NasabahReport from "../components/views/panel/NasabahReport"
import Transaction from "../components/views/panel/Transaction"

const routes = [
    { path: "/", exact: true, index: true, main: () => <Nasabah /> },
    { path: "/transaction", exact: true, main: () => <Transaction /> },
    { path: "/nasabah-point", exact: true, main: () => <NasabahPoint /> },
    { path: "/nasabah-report", exact: true, main: () => <NasabahReport /> },

]

export { routes }