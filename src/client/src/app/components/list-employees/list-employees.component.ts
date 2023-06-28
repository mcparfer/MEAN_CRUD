import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {

  // Variable para inyectar los datos del Observable.
  listEmployees: any = [];

  // Inyectamos el servicio y la herramienta Toasts en el constructor.
  constructor(private _employeeService: EmployeeService, private toastr: ToastrService) { }

  // Después del constructor, ngOnInit ejecuta el método que muestra los empleados.
  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this._employeeService.getEmployee().subscribe({
      next: data => {
        console.log(data);
        this.listEmployees = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  // Método para eliminar empleado.
  deleteEmployee(id: any) {
    this._employeeService.deleteEmployee(id).subscribe({
      next: data => {
        this.toastr.error('Employee was succesfully deleted.', 'Employee Deleted!');
        this.getEmployees();
      },
      error: error => {
        console.log(error);
      }
    })

  }

  //Funciones para mostrar/ocultar columnas en la tabla.
  showFirst: boolean = true
  showLast: boolean = true
  showEmail: boolean = true
  showDpt: boolean = true
  showDate: boolean = true
  showExtra: boolean = true
  showSalary: boolean = true

  toggleFirst() { this.showFirst = !this.showFirst; }
  toggleLast() { this.showLast = !this.showLast; }
  toggleEmail() { this.showEmail = !this.showEmail; }
  toggleDpt() { this.showDpt = !this.showDpt; }
  toggleDate() { this.showDate = !this.showDate; }
  toggleExtra() { this.showExtra = !this.showExtra; }
  toggleSalary() { this.showSalary = !this.showSalary; }


}
