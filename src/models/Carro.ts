export class Carro {
    id: number | any;
    nome: string;
    tipo: string;

    constructor(nome: string, tipo: string, id: any= null) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
    }

    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getTipo(): string {
        return this.tipo;
    }

}

