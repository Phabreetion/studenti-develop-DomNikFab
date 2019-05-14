export class FiltroPianoDiStudio {
    public filtroSuperatiAttivo: boolean;
    public filtroNonSuperatiAttivo: boolean;
    public filtroPerAnno: number; //-1 non attivo -> altrimenti gli altri
    public idOrdinamento: number;
    public tipoOrdinamento: number; //0 crescente --- 1 decrescente



    static toObj(obj: Object): FiltroPianoDiStudio {
        return Object.assign(new FiltroPianoDiStudio(), obj);
    }
}
