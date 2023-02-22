import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Product } from '../../models/product';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [PriceListService, ProductService]
})
export class ProductDetailComponent implements OnInit {

  productCode = new FormControl<string | Product>('', [Validators.required]) ;
  
  form: UntypedFormGroup = new UntypedFormGroup({
    price: new UntypedFormControl(),
    name: new UntypedFormControl(),
    description: new UntypedFormControl(),
  });
  
  matcher = new MyErrorStateMatcher();

  constructor(
    private priceListService: PriceListService, 
    private productService: ProductService,
    private router: Router, 
    private fb: UntypedFormBuilder
  ) { }
 
  filteredOptions = new Observable<Product[]>();

  ngOnInit() {
    this.filteredOptions = this.productCode.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const code = typeof value === 'string' ? value : value?.id;
        return this.productService.getProductByNameLike(code as string);
      }));
  }

  displayFn(product: Product): string {
    return product && product.id ? product.id : '';
  }


  save(form: any): void {
    this.priceListService.savePriceList({
      price: this.form.value['price'],
      name: this.form.value['name'],
      description: this.form.value['description'],
      productCode: this.form.value['productCode'] }
      ).subscribe(

      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/productList'])
      }
    )
  }

}
