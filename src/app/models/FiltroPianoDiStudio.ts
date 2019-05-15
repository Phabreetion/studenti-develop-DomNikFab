export class FiltroPianoDiStudio {

    filtroSuperatiAttivo: boolean;
    filtroNonSuperatiAttivo: boolean;
    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri
    idOrdinamento: number;
    tipoOrdinamento: number; //0 crescente --- 1 decrescente


    constructor() {
        //default value
        this.reset();
    }


    static toObj(obj: Object): FiltroPianoDiStudio {
        return Object.assign(new FiltroPianoDiStudio(), obj);
    }

    isActive(): boolean {
        return this.filtroSuperatiAttivo || this.filtroNonSuperatiAttivo || this.filtroPerAnno > 0;
    }

    reset() {
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.filtroPerAnno = 0;
        this.idOrdinamento = 0;
        this.tipoOrdinamento = 0;
    }

    disableBothFiltri(): void {
        this.filtroNonSuperatiAttivo = false;
        this.filtroSuperatiAttivo = false;
    }//rivedere
}
