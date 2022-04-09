import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceList } from '../models/pricelist';

@Injectable()
export class PriceListService {

    private priceListUrl = 'http://localhost:8080/product';
    constructor(private http: HttpClient) { }

    getPriceList() {
        return this.http.get<Array<PriceList>>(this.priceListUrl);
    }
}