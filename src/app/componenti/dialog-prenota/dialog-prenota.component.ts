import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { PrenotaService } from 'src/app/service/prenota.service';

@Component({
  selector: 'app-dialog-prenota',
  templateUrl: './dialog-prenota.component.html',
  styleUrls: ['./dialog-prenota.component.css']
})
export class DialogPrenotaComponent {
  private campi: any;
  campo_selezionato: any;
  @ViewChild('pickerTime') pickerTime!: NgxMaterialTimepickerComponent;

  constructor(
    private servizioPrenota: PrenotaService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  ngOnInit() {
    this._locale = 'it';
    this._adapter.setLocale(this._locale);
    this.campo_selezionato = this.servizioPrenota.getCampoSelezionato()
  }
  
  getDateFormatString(): string {
    if (this._locale === 'it') {
      return 'DD/MM/YYYY';
    } else {
      return ''; 
    }
  }

  prenota() {
    let data = new Date()
    let giorno, dataAttuale
    let data_letta = (<HTMLInputElement>document.getElementById("inputDate")).value
    const data_mod = `${data_letta.split("/")[2]}-${data_letta.split("/")[1]}-${data_letta.split("/")[0]}`
    console.log(data_mod)
    
    if (data.getDate().toString().length == 1) {
      giorno = "0" + data.getDate()
    }else{
      giorno=data.getDate()
    }
    dataAttuale = new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${giorno}`)
    console.log("dataAttuale " + dataAttuale)
    
    let d_l = new Date(data_mod)
    console.log("data letta "+d_l)

    
    const orario = (<HTMLInputElement>document.getElementById("inputTime")).value
    let id_utente = JSON.parse(localStorage.getItem('user')!).id
    if(dataAttuale.getTime()<d_l.getTime())
      this.servizioPrenota.controllaPrenotazione(id_utente, data_mod, orario)
    else
      alert("Cambia Data")
  }
}

