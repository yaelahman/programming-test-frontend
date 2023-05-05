import moment from "moment";
import "moment/locale/id"

const rupiah = (angka, prefix) => {
    var angka = angka.toString()
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    var separator = ''
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

const tanggalIndo = (tanggal) => {
    moment.locale('id');
    return moment(tanggal).format('LLLL');
}

export {
    rupiah,
    tanggalIndo
}