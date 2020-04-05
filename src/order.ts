import { Serializable } from "./types";

/**
 * Query sorting rule
 */
export class QueryOrder implements Serializable {
    
    private _field: string;
    private _order: QueryOrder.Direction;
    
    /**
     * Creates new sorting directive
     * @param field field to sort by
     * @param order direction of sorting
     */
    public static create(field: string, order: QueryOrder.Direction = QueryOrder.Direction.ASC): QueryOrder {
        const queryOrder = new QueryOrder();
        queryOrder._field = field;
        queryOrder._order = order;
        return queryOrder;
    }
    
    /**
     * Which field to sort by
     */
    public get field(): string {
        return this._field;
    }
    
    /**
     * Determines sorting direction
     */
    public get order(): QueryOrder.Direction {
        return this._order;
    }
    
    /**
     * Set field to sort by
     * @param field field name
     */
    public setField(field: string): QueryOrder {
        this._field = field;
        return this;
    }
    
    /**
     * Set sorting order
     * @param order sort direction
     */
    public setOrder(order: QueryOrder.Direction): QueryOrder {
        this._order = order;
        return this;
    }
    
    public serialize(): string {
        return `${this._field} ${this._order}`;
    }
}

export namespace QueryOrder {
    /**
     * Determines sorting direction
     */
    export enum Direction {
        /**
         * Ascending sorting
         */
        ASC = "ASC",
        /**
         * Descending sorting
         */
        DESC = "DESC",
    }
}
