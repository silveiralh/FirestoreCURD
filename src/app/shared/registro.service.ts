import { Injectable } from '@angular/core';
import { Registro } from './registro.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  formData: Registro;
  
  constructor(private firestore: AngularFirestore) { }
  
  getRegistros() {
    return this.firestore.collection('registros').snapshotChanges();
  }
}
