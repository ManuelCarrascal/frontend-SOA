import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductService } from '../../product.service';
import { ProductoInterface } from 'src/app/interface/producto-interface';
@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CrudTableComponent {
  lastId: number = 0;
  productDialog: boolean = false;
  products: any[] = [];
  product: ProductoInterface = {
    id: 0,
    title: '',
    price: 0,
    category: { id: 0, name: '' },
  };

  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }

  openNew() {
    this.product = {
      id: 0,
      title: '',
      price: 0,
      category: { id: 0, name: '' },
    };
    this.submitted = false;
    this.productDialog = true;
  }

  findIndexById(id: number): number {
    let index = this.products.findIndex((product) => product.id === id);
    return index;
  }
  createId(): number {
    this.lastId++;
    return this.lastId;
  }

  editProduct(product: ProductoInterface) {
    this.product = { ...product };
    this.productDialog = true;
  }
  deleteProduct(product: ProductoInterface) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {
          id: 0,
          title: '',
          price: 0,
          category: { id: 0, name: '' },
        };
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.title?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {
        id: 0,
        title: '',
        price: 0,
        category: { id: 0, name: '' },
      };
    }
  }
}
