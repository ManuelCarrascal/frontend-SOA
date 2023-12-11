import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ArtistService } from '../../artist.service';
import { ArtistaInterface } from 'src/app/interface/artista-interface';
@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CrudTableComponent implements OnInit {
  lastId: number = 0;
  artistDialog: boolean = false;
  artistas!: ArtistaInterface[];
  artista!: ArtistaInterface;
  selectedArtist!: ArtistaInterface[] | null;

  submitted: boolean = false;

  constructor(
    private artistService: ArtistService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.artistService.getArtists(1, 10).subscribe((response) => {
      this.artistas = response;
      console.log(this.artistas);
    });
  }

  openNew() {
    this.artista = {
      id: 0,
      nombre: '',
      nombreartistico: '',
      correo: '',
      contrasena: '',
      telefono: '',
      biografia: '',
    };
    this.submitted = false;
    this.artistDialog = true;
  }

  findIndexById(id: number): number {
    let index = this.artistas.findIndex((product) => product.id === id);
    return index;
  }
  createId(): number {
    this.lastId++;
    return this.lastId;
  }

  editProduct(product: ArtistaInterface) {
    this.artista = { ...product };
    this.artistDialog = true;
  }
  deleteArtist(artist: ArtistaInterface) {
    this.confirmationService.confirm({
      message:
        '¿Estas seguro que deseas eliminar ' + artist.nombreartistico + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.artistService.deleteArtist(artist.id).subscribe(() => {
          this.artistas = this.artistas.filter((val) => val.id !== artist.id);
          this.artista = {
            id: 0,
            nombre: '',
            nombreartistico: '',
            correo: '',
            contrasena: '',
            telefono: '',
            biografia: '',
          };
        });
      },
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que quieres eliminar los productos seleccionados?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.artistas = this.artistas.filter(
          (val) => !this.selectedArtist?.includes(val)
        );
        this.selectedArtist = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Productos Eliminados',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.artistDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.artista.nombre?.trim()) {
      if (this.artista.id) {
        this.artistas[this.findIndexById(this.artista.id)] = this.artista;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Producto Actualizado',
          life: 3000,
        });
      } else {
        this.artista.id = this.createId();
        this.artistas.push(this.artista);
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Producto Creado',
          life: 3000,
        });
      }

      this.artistas = [...this.artistas];
      this.artistDialog = false;
      this.artista = {
        id: 0,
        nombre: '',
        nombreartistico: '',
        correo: '',
        contrasena: '',
        telefono: '',
        biografia: '',
      };
    }
  }
}
