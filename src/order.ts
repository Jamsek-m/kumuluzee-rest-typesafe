export class QueryOrder {
    public field: string;
    public order: QueryOrder.Direction;
    
    constructor(field: string, order: QueryOrder.Direction) {
        this.field = field;
        this.order = order;
    }
    
    /**
     * Creates query parameter value
     * @returns String built from current values to be used as query parameter value.
     */
    public buildValue(): string {
        return `${this.field} ${this.order}`;
    }
}

export namespace QueryOrder {
    export enum Direction {
        ASC = "ASC",
        DESC = "DESC",
    }
}
