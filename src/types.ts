/**
 * Query parameters object
 */
export interface QueryParamMap {
    /**
     * Offset results by given number
     */
    offset?: string;
    
    /**
     * Limit number of returned results
     */
    limit?: string;
    
    /**
     * Query sorting rules
     */
    order?: string;
    
    /**
     * Query filter rules
     */
    filters?: string;
}

export interface Serializable {
    
    /**
     * Creates string from object values
     * @returns serialized string
     */
    serialize(): string;
    
}
