import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceList } from '../models/pricelist';

@Injectable()
export class PriceListService {

    private priceListUrl = 'http://localhost:8080/priceList';
    constructor(private http: HttpClient) { }

    getPriceList() {
        return this.http.get<Array<PriceList>>(this.priceListUrl);
    }

    getPriceListByNameLike(productCode: string) {
        return this.http.get<Array<PriceList>>(this.priceListUrl + "?code=" + productCode);
    }

    savePriceList(priceList: PriceList) {
        return this.http.post<PriceList>(this.priceListUrl, priceList);
    }
}