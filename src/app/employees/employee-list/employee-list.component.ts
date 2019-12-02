import { Component, OnInit, ViewChild } from '@angular/core';

//import services
import { EmployeeService } from "../../shared/employee.service";
import { DepartmentService } from "../../shared/department.service";

//Material DataTable
import { MatTableDataSource, MatTable, MatSort, MatPaginator } from "@angular/material";

 
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  searchkey: string;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns:string[] = ['fullName','email','mobile','city','departmentName','actions'];

  ngOnInit() {
    this.employeeService.getEmployee().subscribe(
      list => {
        let array = list.map(item => {
          //let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          //let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
            departmentName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      } 
    );
  }

  onSearchClear(){
    this.searchkey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

}