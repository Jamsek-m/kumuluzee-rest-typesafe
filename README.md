# Typesafe KumuluzEE Rest client library

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Jamsek-m/kumuluzee-rest-typesafe)](https://github.com/Jamsek-m/kumuluzee-rest-typesafe/releases)
[![GitHub license](https://img.shields.io/github/license/Jamsek-m/kumuluzee-rest-typesafe)](https://github.com/Jamsek-m/kumuluzee-rest-typesafe/blob/master/LICENSE)

> Typescript library for typesafe interaction with KumuluzEE Rest endpoints 

## Installation

To use package run:

```bash
npm instal --save @mjamsek/kumuluzee-rest-typesafe
```

## Usage

### Constructing QueryParameters object

```typescript
import { QueryParameters, QueryOrder, QueryFilter } from "@mjamsek/kumuluzee-rest-typesafe";

// Creates instance
const queryParameters = new QueryParameters();
// Set offset
queryParameters.setOffset(0);
// Set limit
queryParameters.setLimit(10);
// Set sorting rules
queryParameters.setOrder([
    new QueryOrder("name", QueryOrder.Direction.DESC)
]);
// Add single rule to set of existing sorting rules
queryParameters.addSingleOrder(new QueryOrder("lastName", QueryOrder.Direction.ASC));
// Set filter rules
queryParameters.setFilters([
    new QueryFilter().setField("name")
        .setOperation(QueryFilter.Operation.IN)
        .setListValue(["John", "Alice", "Bob"]),
    new QueryFilter().setField("dateOfBirth")
        .setOperation(QueryFilter.Operation.LT)
        .setDateValue(new Date())
]);
// Add single rule to set of existing filter rules
queryParameters.addSingleFilter(
    new QueryFilter()
        .setField("carId")
        .setOperation(QueryFilter.Operation.ISNULL)
);
```

### Using QueryParameters object

Object exposes methods to ease sending query params to server.

#### Example in plain XMLHttpRequest:

```typescript
// Get query string from QueryParameters object
// Query string is additionaly encoded
const query = encodeURI(queryParameters.getQueryString());
const url = `http://localhost:8080/v1/orders?${query}`;

const request = new XMLHttpRequest();
request.open("GET", url, true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("error", (err) => {
    console.error(err);
});
request.addEventListener("load", () => {
    const ordersList = JSON.parse(request.responseText);
    const ordersCount = parseInt(request.getResponseHeader("X-Total-Count"), 10);
});
request.send();
```

#### Example with Angular's HttpClient:

```typescript
import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http"; import { QueryParameters } from "./query-parameters";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { QueryParameters } from "@mjamsek/kumuluzee-rest-typesafe";

@Injectable({
    providedIn: "root"
})
export class OrdersService {
    
    constructor(@Inject("apiUrl") private apiUrl: string,
                private http: HttpClient) { }
    
    public getOrders(queryParameters: QueryParameters): Observable<EntityList<Order>> {
        const url = `${this.apiUrl}/orders`;
        // Get param map, which can be directly used as query param
        // Angular auto-encodes URI, therefore no encoding needed
        const paramsMap = queryParameters.getMap();
        return this.http.get(url, {observe: "response", params: paramsMap}).pipe(
            map((res: HttpResponse<Order[]>) => {
                return {
                    count: parseInt(res.headers.get("X-Total-Count"), 10),
                    entities: res.body
                }
            })
        );
    }

}
```

## More information

More information about KumuluzEE Rest can be found on its [Github page](https://github.com/kumuluz/kumuluzee-rest).

## Bugs

Issues can be reported on [issues page](https://github.com/Jamsek-m/kumuluzee-rest-typesafe/issues).

## License

MIT
