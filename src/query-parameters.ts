import { QueryOrder } from "./order";
import { QueryFilter } from "./filter";
import { QueryParamMap } from "./types";

export class QueryParameters {
    /**
     *
     */
    public offset: number;
    public limit: number;
    public order: QueryOrder[];
    public filters: QueryFilter[];
    public fields: string[];
    
    /**
     * Creates query parameter map from current values. Values may need to be URL encoded.
     * @returns object with values prepared to be sent
     */
    public getMap(): QueryParamMap {
        return {
            offset: this.offset,
            limit: this.limit,
            fields: this.fields.join(","),
            order: this.order.map(o => o.buildValue()).join(","),
            filters: this.filters.map(f => f.buildValue()).join(","),
        };
    }
    
    /**
     * Creates query parameter string from current values. String may need to be URL encoded.
     * @returns string containing query parameters
     */
    public getQueryString(): string {
        const map = this.getMap();
        return Object.keys(map).map(key => {
            return `${key}=${(map as any)[key]}`;
        }).join("&");
    }
}
