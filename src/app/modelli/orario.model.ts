export class Orario {
  constructor(
    private _ora:number,
    private _minuti: number
  ) { }
  
  toString() {
    if (this._ora.toString().length == 1 && this._minuti.toString().length == 2) {
      return `0${this._ora}:${this._minuti}`
    } else if (this._ora.toString().length == 2 && this._minuti.toString().length == 1) {
      return `${this._ora}:0${this._minuti}`
    } else if (this._ora.toString().length == 1 && this._minuti.toString().length == 1) {
      return `0${this._ora}:0${this._minuti}`
    } else
      return `${this._ora}:${this._minuti}`
  }

  getOra() {
    return this._ora
  }
  getMinuti() {
    return this._minuti
  }
  setOra(ora:number) {
    this._ora=ora
  }
  setMinuti(minuti: number) {
    this._minuti=minuti
  }
}