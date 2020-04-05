import { QueryOrder } from "./order";
import { QueryFilter } from "./filter";
import { QueryParamMap } from "./types";

/**
 * Query parameters object
 */
export class QueryParameters {
    
    private _offset: number;
    private _limit: number;
    private _order: QueryOrder[];
    private _filters: QueryFilter[];
    
    /**
     * Offset results by given number
     */
    public get offset(): number {
        return this._offset;
    }
    
    /**
     * Set query offset
     * @param offset skip first <code>x</code> results
     */
    public setOffset(offset: number): QueryParameters {
        this._offset = offset;
        return this;
    }
    
    /**
     * Limit number of returned results
     */
    public get limit(): number {
        return this._limit;
    }
    
    /**
     * Set query limit
     * @param limit return only <code>x</code> results
     */
    public setLimit(limit: number): QueryParameters {
        this._limit = limit;
        return this;
    }
    
    /**
     * Query sorting rules
     * @returns copy of order array
     */
    public get order(): QueryOrder[] {
        return [...this._order];
    }
    
    /**
     * Set sorting rules
     * @param order array of order rules
     */
    public setOrder(order: QueryOrder[]): QueryParameters {
        this._order = order;
        return this;
    }
    
    /**
     * Add single sorting rule
     * @param order single order rule
     */
    public appendOrder(order: QueryOrder): QueryParameters {
        if (!this._order) {
            this._order = [];
        }
        this._order.push(order);
        return this;
    }
    
    /**
     * Clears sorting rules
     */
    public clearOrder(): void {
        this._order = undefined;
    }
    
    /**
     * Query filter rules
     * @returns copy of filter array
     */
    public get filters(): QueryFilter[] {
        return [...this._filters];
    }
    
    /**
     * Set filter rules
     * @param filters array of filter rules
     */
    public setFilters(filters: QueryFilter[]): QueryParameters {
        this._filters = filters;
        return this;
    }
    
    /**
     * Add single filter rule
     * @param filter single filter rule
     */
    public appendFilter(filter: QueryFilter): QueryParameters {
        if (!this._filters) {
            this._filters = [];
        }
        this._filters.push(filter);
        return this;
    }
    
    /**
     * Clears filter rules
     */
    public clearFilter(): void {
        this._filters = undefined;
    }
    
    /**
     * Creates query parameter map from current values. Values may need to be URL encoded.
     * @returns object with values prepared to be sent
     */
    public getRawValue(): QueryParamMap {
        const map: QueryParamMap = {};
        if (this._offset) {
            map.offset = this._offset.toString(10);
        }
        if (this._limit) {
            map.limit = this._limit.toString(10);
        }
        if (this._filters) {
            map.filters = this._filters.map(f => f.serialize()).join(" ");
        }
        if (this._order) {
            map.order = this._order.map(o => o.serialize()).join(",");
        }
        return map;
    }
    
    /**
     * Creates query parameter string from current values. String may need to be URL encoded.
     * @returns string containing query parameters
     */
    public getQueryString(): string {
        const map = this.getRawValue();
        return Object.keys(map)
            .filter(key => (map as any)[key])
            .map(key => {
                return `${key}=${(map as any)[key]}`;
            }).join("&");
    }
}
