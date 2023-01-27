import { Component, Input, OnInit } from '@angular/core';
import { ProductoPedido } from 'src/app/models/models';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.scss'],
})
export class ItemCarritoComponent implements OnInit {
@Input() productoPedido:ProductoPedido | undefined;
  constructor() { }

  ngOnInit() {}

}
