import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from '../../models/product';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [PriceListService, ProductService]
})
export class ProductDetailComponent implements OnInit {


  form: FormGroup = new FormGroup({
    price: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    productCode: new FormControl<string| Product>() 
  });

  options: Product[] = [{code: 'P1', name: 'Mary', description: ''}];
  filteredOptions = new Observable<Array<Product>>();

  constructor(private priceListService: PriceListService, private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.filteredOptions = this.form.get('productCode')?.valueChanges.pipe(
      map(value => {
        const  = typeof value === 'string' ? value : value?.code;
        return code ? code : this.options.slice();
      }),
    );
  }

  displayFn(product: Product): string {
    return product && product.code ? product.code : '';
  }


  save(form: any): void {
    this.priceListService.savePriceList({ price: this.form.value['price'], name: this.form.value['name'], description: this.form.value['description'], productCode: this.form.value['productCode'] }).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/productList'])
      }
    )
  }

}
