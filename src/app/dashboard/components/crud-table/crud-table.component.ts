import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../product.service';
@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  providers: [MessageService],
})
export class CrudTableComponent {
  productDialog: boolean = false;

  submitted: boolean = false;

  statuses!: any[];

  constructor() {}

  ngOnInit() {
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;

    return index;
  }
}
