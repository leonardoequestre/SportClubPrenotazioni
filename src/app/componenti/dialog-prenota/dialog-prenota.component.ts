import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Orario } from 'src/app/modelli/orario.model';
import { PrenotaService } from 'src/app/service/prenota.service';

@Component({
  selector: 'app-dialog-prenota',
  templateUrl: './dialog-prenota.component.html',
  styleUrls: ['./dialog-prenota.component.css']
})
export class DialogPrenotaComponent {
  private campi: any;
  campo_selezionato: any;
  arrayOrario: string[] = [];

  constructor(
    private servizioPrenota: PrenotaService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  ngOnInit() {
    this._locale = 'it';
    this._adapter.setLocale(this._locale);
    this.campo_selezionato = this.servizioPrenota.getCampoSelezionato()
    this.setOrari()
    console.log(this.arrayOrario)
  }

  setOrari() {
    let indice=0,j=7
    while (j < 24) {
      let i=0
      while (i < 60) {
        let orario=new Orario(j%24,i%60)
        this.arrayOrario[indice] = orario.toString()
        indice++
        i+=30 
      }
      j++
      indice++
    }
  }
  
  getDateFormatString(): string {
    if (this._locale === 'it') {
      return 'DD/MM/YYYY';
    } else {
      return ''; 
    }
  }

  prenota() {
    let data_letta = (<HTMLInputElement>document.getElementById("inputDate")).value
    console.log(data_letta.split("/"))
    const data_mod = `${data_letta.split("/")[2]}-${data_letta.split("/")[1]}-${data_letta.split("/")[0]}`
    console.log(data_mod)
    const orario=(<HTMLInputElement>document.getElementById("inputTime")).value
    let id_utente = JSON.parse(localStorage.getItem('user')!).id
    this.servizioPrenota.controllaPrenotazione(id_utente, data_mod, orario)
  }
}
