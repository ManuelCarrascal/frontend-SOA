import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ArtistService } from '../../artist.service';
import { ArtistaInterface } from 'src/app/interface/artista-interface';
import { forkJoin } from 'rxjs';
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
  blockChars: RegExp = /^[^<>*!'`]+$/;

  emailError: string | null = null;
  phoneError: string | null = null;

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
    this.phoneError = null;
    this.emailError = null;
  }

  findIndexById(id: number): number {
    let index = this.artistas.findIndex((artist) => artist.id === id);
    return index;
  }
  createId(): number {
    this.lastId++;
    return this.lastId;
  }

  editProduct(artist: ArtistaInterface) {
    this.artista = { ...artist };
    this.artistDialog = true;
    this.emailError = null;
    this.phoneError = null;
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

  deleteSelectedArtistas() {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que quieres eliminar los Artistas seleccionados?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteObservables =
          this.selectedArtist?.map((artist) =>
            this.artistService.deleteArtist(artist.id)
          ) ?? [];
        forkJoin(deleteObservables).subscribe(() => {
          this.artistas = this.artistas.filter(
            (val) => !this.selectedArtist?.includes(val)
          );
          this.selectedArtist = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Artistas Eliminados',
            life: 3000,
          });
        });
      },
    });
  }

  hideDialog() {
    this.artistDialog = false;
    this.submitted = false;
  }
  saveArtist() {
    this.submitted = true;
    if (this.artista.nombre?.trim()) {
      this.artista.telefono = this.artista.telefono.replace(/\D/g, '');
      if (!this.validatePhoneNumber(this.artista.telefono)) {
        this.phoneError = 'El número de teléfono no es válido';
        return;
      }
      if (this.artista.id) {
        this.artistService.updateArtist(this.artista).subscribe(
          (updatedArtist) => {
            // Actualizar los datos del artista en this.artistas
            const index = this.artistas.findIndex(
              (artist) => artist.id === updatedArtist.id
            );
            if (index !== -1) {
              this.artistas[index] = updatedArtist;
            }

            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Artista Actualizado',
              life: 3000,
            });
            this.artistDialog = false;
            this.refreshArtists();
          },
          (error) => {
            // Suponiendo que el error viene en este formato
            this.emailError = error.error.errors.find(
              (err: any) => err.path === 'correo'
            )?.msg;
          }
        );
      } else {
        this.artistService.createArtist(this.artista).subscribe(
          (newArtist) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Artista Creado',
              life: 3000,
            });
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
            this.refreshArtists();
          },
          (error) => {
            console.log(error);

            // Suponiendo que el error viene en este formato
            this.emailError = error.error.errors.find(
              (err: any) => err.path === 'correo'
            )?.msg;
          }
        );
      }
    }
  }

  refreshArtists() {
    this.artistService.getArtists(1, 10).subscribe((response) => {
      this.artistas = response;
    });
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    // Verificar que el número de teléfono tenga una longitud de 10
    return phoneNumber.length === 10;
  }
}
