export class Concessionaria {
    id: number | any;
    nome: string;
    cnpj: string;
    cidade: string;

    constructor(nome: string, cnpj: string, cidade: string, id: any = null,) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
        this.cidade =cidade;
    }

    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getTipo(): string {
        return this.cnpj;
    }

}