import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  listDpt: any = [];

  constructor(private _departmentService: DepartmentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDepartments()
  }

  getDepartments() {
    this._departmentService.getDepartment().subscribe({
      next: data => {
        console.log(data);
        this.listDpt = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteDepartment(id: any) {
    this._departmentService.deleteDepartment(id).subscribe({
      next: data => {
        this.toastr.error('Department was succesfully deleted.', 'Department Deleted!');
        this.getDepartments();
      },
      error: error => {
        console.log(error);
      }
    })

  }

  showName: boolean = true;
  showContact: boolean = true;
  showShifts: boolean = true;
  showEmployees: boolean = true;

  toggleName() { this.showName = !this.showName; }
  toggleContact() { this.showContact = !this.showContact; }
  toggleShifts() { this.showShifts = !this.showShifts; }
  toggleEmployees() { this.showEmployees = !this.showEmployees; }


}
