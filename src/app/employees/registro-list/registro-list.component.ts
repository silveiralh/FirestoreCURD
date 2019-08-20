import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/shared/registro.model';
import { RegistroService } from 'src/app/shared/Registro.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-list.component.html',
  styleUrls: ['./registro-list.component.css']
})
export class RegistroListComponent implements OnInit {

  list: Registro[];
  
  constructor(private service: RegistroService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getRegistros().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Registro;
      })
    });
  }

  onEdit(reg: Registro) {
    this.service.formData = Object.assign({}, reg);
  }
 
  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('registros/' + id).delete();
      this.toastr.warning("Registro deleted from firestore database successfully!","Delete");
    }
  }

}
