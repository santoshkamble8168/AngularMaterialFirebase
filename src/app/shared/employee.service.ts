import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

//Firebase Database
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    mobile: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.minLength(10)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(''),
    hiredate: new FormControl('',Validators.required),
    isPermanent: new FormControl(false),
  });

  initEmployeeFormGroup(){
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: 1,
      department: '',
      hiredate: '',
      isPermanent: false
    });
  }

  //Get employee list
  getEmployee(){
    this.employeeList = this.firebase.list('employee');
    return this.employeeList.snapshotChanges();
  }

  //insert employee
  insertEmployee(employee){
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hiredate: employee.hiredate,
      isPermanent: employee.isPermanent
    });
  }

  updateEmployee(employee){
    this.employeeList.update(employee.$key,{
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hiredate: employee.hiredate,
      isPermanent: employee.isPermanent
    })
  }

  deleteEmployee($key:string){
    this.employeeList.remove($key);
  }

}
