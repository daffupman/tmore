export class PageInfo<T> {

    private list: T[];
    private total: number;

    constructor(list: T[]) {
        this.list = list;
        this.total = list.length;
    }

    public setList(list: T[]) {
        this.list = list;
        this.total = list.length;
    }

    public getList(): T[] {
        return this.list;
    }

    public getTotal(): number {
        return this.total;
    }
}
