import { Injectable } from '@angular/core';

//Firebase Database
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

//Lodash Libraby
//import * as  _ from 'lodash';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('department');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item=> {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        }
        )
      }
    );
   }

   getDepartmentName($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
      //return this.array.map(name => return {})
    }
  }

}
