import { QueryOrder } from "./order";
import { QueryFilter } from "./filter";
import { QueryParamMap } from "./types";

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
     * Limit number of returned results
     */
    public get limit(): number {
        return this._limit;
    }
    
    /**
     * Query sorting rules
     */
    public get order(): QueryOrder[] {
        return this._order;
    }
    
    /**
     * Query filter rules
     */
    public get filters(): QueryFilter[] {
        return this._filters;
    }
    
    /**
     * Set query offset
     * @param offset skip first <tt>x</tt> results
     */
    public setOffset(offset: number): QueryParameters {
        this._offset = offset;
        return this;
    }
    
    /**
     * Set query limit
     * @param limit return only <tt>x</tt> results
     */
    public setLimit(limit: number): QueryParameters {
        this._limit = limit;
        return this;
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
    public addSingleOrder(order: QueryOrder): QueryParameters {
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
    public addSingleFilter(filter: QueryFilter): QueryParameters {
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
    public getMap(): QueryParamMap {
        const map: QueryParamMap = {};
        if (this._offset) {
            map.offset = this._offset;
        }
        if (this._limit) {
            map.limit = this._limit;
        }
        if (this._filters) {
            map.filters = this._filters.map(f => f.buildValue()).join(" ");
        }
        if (this._order) {
            map.order = this._order.map(o => o.buildValue()).join(",");
        }
        return map;
    }
    
    /**
     * Creates query parameter string from current values. String may need to be URL encoded.
     * @returns string containing query parameters
     */
    public getQueryString(): string {
        const map = this.getMap();
        return Object.keys(map)
            .filter(key => (map as any)[key])
            .map(key => {
                return `${key}=${(map as any)[key]}`;
            }).join("&");
    }
}
