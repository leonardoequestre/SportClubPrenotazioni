import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarouselItemComponent } from '@coreui/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogPrenotaComponent } from 'src/app/componenti/dialog-prenota/dialog-prenota.component';
import { PrenotaService } from 'src/app/service/prenota.service';

@Component({
  selector: 'app-prenota',
  templateUrl: './prenota.component.html',
  styleUrls: ['./prenota.component.css']
})
export class PrenotaComponent {
  campi: any
  ut:any

  constructor(
    private authService: AuthService,
    private servizioPrenota: PrenotaService,
    public dialog: MatDialog) { }
  
  ngOnInit() {
    this.campi = this.servizioPrenota.getCampiSportivi();
    console.log(this.campi)
    this.ut=this.authService.user
  }

  openDialogPrenota(campoSelezionato: any) {
    this.servizioPrenota.setCampoSelezionato(campoSelezionato);
    this.dialog.open(DialogPrenotaComponent)
  }
}
