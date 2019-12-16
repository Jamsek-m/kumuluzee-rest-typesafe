export class QueryFilter {

    private _field: string;
    private _operation: QueryFilter.Operation;
    private _value: string;
    
    /**
     * Value to be filtered
     */
    public get value(): string {
        return this._value;
    }
    
    /**
     * Filter operation
     */
    public get operation(): QueryFilter.Operation {
        return this._operation;
    }
    
    /**
     * Field name to filter by
     */
    public get field(): string {
        return this._field;
    }
    
    /**
     * Set query value of type string
     * @param value
     */
    public setValue(value: string): QueryFilter {
        this._value = `'${value}'`;
        return this;
    }
    
    /**
     * Set query value of type number
     * @param value
     */
    public setNumberValue(value: number): QueryFilter {
        this._value = value.toString(10);
        return this;
    }
    
    /**
     * Set query value of type list
     * @param value
     */
    public setListValue(...value: number[] | string[] | boolean[]): QueryFilter {
        this._value = `[${value.join(",")}]`;
        return this;
    }
    
    /**
     * Set query value of type Date
     * @param value
     */
    public setDateValue(value: Date): QueryFilter {
        this._value = `'${value.toISOString()}'`;
        return this;
    }
    
    /**
     * Set filter operation
     * @param operation to be used in filtering
     */
    public setOperation(operation: QueryFilter.Operation): QueryFilter {
        this._operation = operation;
        if (operation === QueryFilter.Operation.ISNULL ||
            operation === QueryFilter.Operation.ISNOTNULL) {
            this._value = undefined;
        }
        return this;
    }
    
    /**
     * Set field to be filtered
     * @param field field to be used in filter
     */
    public setField(field: string): QueryFilter {
        this._field = field;
        return this;
    }
    
    /**
     * Creates string from query parameter value. String may need to be URL encoded.
     * @returns String built from current values to be used as query parameter value.
     */
    public buildValue(): string {
        if (this._operation === QueryFilter.Operation.ISNULL ||
            this._operation === QueryFilter.Operation.ISNOTNULL) {
            return `${this.field}:${this._operation}`;
        }
        return `${this.field}:${this._operation}:${this._value}`;
    }
    
}

export namespace QueryFilter {
    export enum Operation {
        /**
         * Equals
         */
        EQ = "EQ",
        /**
         * Equals ignore case
         */
        EQIC = "EQIC",
        /**
         * Not equals
         */
        NEQ = "NEQ",
        /**
         * Not equals ignore case
         */
        NEQIC = "NEQIC",
        /**
         * Like
         */
        LIKE = "LIKE",
        /**
         * Like ignore case
         */
        LIKEIC = "LIKEIC",
        /**
         * Greater than
         */
        GT = "GT",
        /**
         * Greater or equal than
         */
        GTE = "GTE",
        /**
         * Lower than
         */
        LT = "LT",
        /**
         * Lower or equal than
         */
        LTE = "LTE",
        /**
         * Contained in list
         */
        IN = "IN",
        /**
         * Contained in list ignore case
         */
        INIC = "INIC",
        /**
         * Not contained in list
         */
        NIN = "NIN",
        /**
         * Not contained in list ignore case
         */
        NINIC = "NINIC",
        /**
         * Is null
         */
        ISNULL = "ISNULL",
        /**
         * Is not null
         */
        ISNOTNULL = "ISNOTNULL",
    }
}
