export class FiltroPianoDiStudio {

    filtroSuperatiAttivo: boolean;
    filtroNonSuperatiAttivo: boolean;
    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri
    idOrdinamento: number;
    tipoOrdinamento: number; //0 crescente --- 1 decrescente
    maxAnni: number;


    constructor() {
        //default value
        this.reset();
        this.maxAnni  = 1;
    }


    static toObj(obj: Object): FiltroPianoDiStudio {
        return Object.assign(new FiltroPianoDiStudio(), obj);
    }

    isActive(): boolean {
        return this.filtroSuperatiAttivo || this.filtroNonSuperatiAttivo || this.filtroPerAnno > 0;
    }

    setMaxAnni(maxAnni: number) {
        this.maxAnni = maxAnni;
    }

    reset() {
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.filtroPerAnno = 0;
        this.idOrdinamento = 0;
        this.tipoOrdinamento = 0;
    }


    //qui funzioni toggle che si disattivano  alternativamente
    disableFiltroEsamiSuperati(): void {
        this.filtroSuperatiAttivo = false;
    }

    disableFiltroEsamiNonSuperati(): void {
        this.filtroNonSuperatiAttivo = false;
    }
}
