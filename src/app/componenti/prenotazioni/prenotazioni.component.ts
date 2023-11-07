import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Orario } from 'src/app/modelli/orario.model';
import { PrenotaService } from 'src/app/service/prenota.service';
import { DialogConfermaComponent } from '../dialog-conferma/dialog-conferma.component';

export interface elementoPrenotazione{
  id_prenotazione: number;
  campo: number;
  persona: number;
  nome_campo: string;
  tipo_sport: string;
  data: Date;
  orario: Orario;
  prezzo: number;
}

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
 

export class PrenotazioniComponent {
  displayedColumns: string[] = ['select', 'nome_campo', 'tipo_sport', 'data', 'ora', 'prezzo'];
  prenotazioni: any
  dataSource!: MatTableDataSource<elementoPrenotazione>;
  selezione = this._formbuilder.group({ selezionato: false });
  

  constructor(
    private cdr:ChangeDetectorRef,
    private servizio: PrenotaService,
    private http: HttpClient,
    private _formbuilder: FormBuilder,
    public dialog:MatDialog
  ) { }

  getPrenotazioni() {
    let id_persona: number = JSON.parse(localStorage.getItem('user')!).id
    console.log(id_persona)
    let dati: any = {
      "id_persona": id_persona
    }
    this.http.post("http://localhost:3100/api/getPrenotazioni", dati).subscribe(
      (resultData: any) => {
        console.log("stampo result data")
        console.log(resultData.data)
        this.prenotazioni = resultData.data
        console.log(this.prenotazioni)
      }
    )
  }

  elimina(row: elementoPrenotazione) {
    const dialogRef = this.dialog.open(DialogConfermaComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servizio.eliminaPrenotazione(row.id_prenotazione)
        this.ngOnInit()
      }
    });
  }

  ngOnInit() {
    this.getPrenotazioni()
    this.dataSource = new MatTableDataSource<elementoPrenotazione>(this.prenotazioni);
  }

}

