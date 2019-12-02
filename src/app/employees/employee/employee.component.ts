import { Component, OnInit } from '@angular/core';

//Import Service
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  /*departments = [
    {id:1, value:"Department 1"},
    {id:2, value:"Department 2"},
    {id:3, value:"Department 3"},
    {id:4, value:"Department 4"},
  ];*/

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.employeeService.getEmployee();
  }

  onSubmit(){
    if(this.employeeService.form.valid){
      this.employeeService.insertEmployee(this.employeeService.form.value);
      this.employeeService.form.reset();
      this.employeeService.initEmployeeFormGroup();
      this.notificationService.success('::Submittted Successfully!');
    }
  }

  onClear(){
    this.employeeService.form.reset();
    this.employeeService.initEmployeeFormGroup();
    this.notificationService.formCleared('::Form Cleared!');
  }

}
