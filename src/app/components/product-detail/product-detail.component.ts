import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [PriceListService]
})
export class ProductDetailComponent  {

  form: FormGroup = new FormGroup({
    price: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    productCode:  new FormControl()
    
  });

  
  constructor(private priceListService: PriceListService, private router: Router, private fb: FormBuilder) { }

  

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
