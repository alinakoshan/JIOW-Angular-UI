import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  price: number = 0.0;
  name: string = '';
  description: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
