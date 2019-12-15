export class QueryFilter {
    public field: string;
    public _operation: QueryFilter.Operation;
    private _value: string;
    
    get value(): string {
        return this._value;
    }
    
    get operation(): QueryFilter.Operation {
        return this._operation;
    }
    
    public setValue(value: string) {
        this._value = `'${value}'`;
    }
    
    public setNumberValue(value: number) {
        this._value = value.toString(10);
    }
    
    public setListValue(value: number[] | string[] | boolean[]) {
        this._value = `[${value.join(",")}]`;
    }
    
    public setDateValue(value: Date) {
        this._value = `'${value.toISOString()}'`;
    }
    
    public setOperation(operation: QueryFilter.Operation) {
        this._operation = operation;
        if (operation === QueryFilter.Operation.ISNULL ||
            operation === QueryFilter.Operation.ISNOTNULL) {
            this._value = undefined;
        }
    }
    
    /**
     * Creates query parameter value
     * @returns String built from current values to be used as query parameter value.
     */
    public buildValue(): string {
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
