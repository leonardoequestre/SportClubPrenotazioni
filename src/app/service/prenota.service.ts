import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrenotaService {
  private campi_sportivi: any;
  private campo_selezionato: any;

  constructor(private http: HttpClient) { }
  
  getCampi() {
    this.http.get("http://localhost:3100/api/getCampi").subscribe(
        (resultData: any) => {
        this.campi_sportivi = resultData.data;
        }
      ) 
  }
  
  getCampiSportivi() {
    return this.campi_sportivi
  }
  
  setCampoSelezionato(c_s: any) {
    //console.log("campo_selezionato");
    //console.log(c_s);
    this.campo_selezionato = c_s;
  }

  getCampoSelezionato() {
    return this.campo_selezionato;
  }

  private inviaPrenotazione(id_persona: number, data: string, ora: string) {
    let dati: any = {
      "id_persona": id_persona,
      "id_campo": this.campo_selezionato.id,
      "data": data,
      "ora":ora
    }
    this.http.post("http://localhost:3100/api/addPrenotazioni", dati).subscribe(
      (resultData: any) => {
        if (resultData.status)
          alert(resultData.message)
        else
          alert(resultData.message)
      });
  }

  controllaPrenotazione(id_persona: number, data: string, ora: string) {
    let dati: any = {
      "id_persona": id_persona,
      "id_campo": this.campo_selezionato.id,
      "data": data,
      "ora":ora
    }
    if (dati.data == "undefined-undefined-" || dati.ora == "")
      alert("Data o Ora non selezionata")
    else if (dati.ora.split(":")[1] != "00")
      alert("Ora non disponibile")
    else {
      this.http.post("http://localhost:3100/api/checkPrenotazioni", dati).subscribe(
        (resultData: any) => {
          if (resultData.status) {
            this.inviaPrenotazione(id_persona, data, ora)
          } else {
            alert(resultData.message)
          }
        });
    }
  }

  eliminaPrenotazione(id: number) {
    let dati: any = {
      'id_p': id
    }
    this.http.get("http://localhost:3100/api/deletePrenotazioni/"+dati.id_p).subscribe(
      (resultData: any) => {
        if (resultData.status) {
          alert(resultData.message)
        }
      });
  }
}
