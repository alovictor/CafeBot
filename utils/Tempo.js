module.exports = function  tempoDeUso(data) {
    const now = new Date();
    var milisegundos = now - data;
    var segundos = milisegundos / 1000;
    var minutos = segundos / 60;
    var horas = minutos / 60;
    var dias = horas / 24;
    var meses = dias / 30;
    var diasSobrando = dias % 30;
    var anos = meses / 12;
    var mesesSobrando = meses % 12;

    if (anos >= 1) {
        return `${Math.floor(anos)} anos, ${Math.floor(mesesSobrando)} meses e ${Math.floor(diasSobrando)} dias`;
    }
    if (meses >= 1) {
        if (meses == 1) {
            return `${Math.floor(meses)} mes e `;
        }
        return `${Math.floor(mesesSobrando)} meses e ${Math.floor(diasSobrando)} dias`;
    }
    if (dias >= 1) {
        if (dias == 1) {
            return `${Math.floor(dias)} dia`;
        }
        return `${Math.floor(diasSobrando)} dias`;
    }
    if (horas >= 1) {
        if (horas == 1) {
            return `${Math.floor(horas)} hora`;
        }
        return `${Math.floor(horas)} horas`;
    }
    if (minutos >= 1) {
        if (minutos == 1) {
            return `${Math.floor(minutos)} minuto`;
        }
        return `${Math.floor(minutos)} minutos`;
    }
    if (segundos >= 1) {
        return `${Math.floor(segundos)} segundos`;
    }
}