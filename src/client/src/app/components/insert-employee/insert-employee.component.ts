import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
import dateFormat, { masks } from "dateformat";

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})

export class InsertEmployeeComponent implements OnInit {

  // Propiedad de la clase que almacenará el parametro id de la URL.
  id: string | null;

  // Titulo del componente.
  title = 'Employee Registration Form';

  // Opciones del campo select en el HTML.
  option = null;
  listDpt: any = [];

  // Propiedad de la clase que almacenará los datos del formulario.
  employeeForm: FormGroup;

  // Constructor y validaciones.
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _employeeService: EmployeeService,
    private aRouter: ActivatedRoute,
    private _departmentService: DepartmentService,) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      departmentID: [0, Validators.required],
      hireDate: ['', Validators.required],
      supervisor: false,
      manager: false
    });

    // Almacenamos el parametro id de la URL en la propiedad.
    this.id = this.aRouter.snapshot.paramMap.get('id');

  };

  // El ngOnInit ejecuta la función que comprueba si existe un id en la URL 
  // También hay otra para traer los departamentos e insertarlos en las opciones del elemento select.
  ngOnInit(): void {
    this.editEmployee();
    this.getDepartments();
  };
  
  // Trae los departamentos desde la base de datos.
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

  // Se ejecuta al pulsar el botón de Submit (añadiendo o editando empleados).
  addEmployee() {

    // Declaramos variables con los valores del formularios.
    let firstName = this.employeeForm.get('firstName')?.value
    let lastName = this.employeeForm.get('lastName')?.value
    let email = this.employeeForm.get('email')?.value
    let departmentID = this.employeeForm.get('departmentID')?.value
    let hireDate = this.employeeForm.get('hireDate')?.value
    let supervisor = this.employeeForm.get('supervisor')?.value
    let manager = this.employeeForm.get('manager')?.value

    // Constante con el valor del id de la URL.
    const oldId: any = this.id

    // Creamos el objeto de clase Employee y lo almacenamos en una variable.
    let employee = new Employee(firstName, lastName, email, departmentID, hireDate, supervisor, manager)


    if (this.id !== null) {

      // Si el id de la URL no es nulo (editar empleado)...
      // Usando la constante oldId no habrá problema con el _id aleatorio creado por el constructor de la clase Employee.
      this._employeeService.editEmployee(oldId, employee).subscribe({
        next: data => {
          console.log(employee);
          this.toastr.info('Employee was succesfully edited.', 'Employee Edited!');
          this.router.navigate(['/list-employees']);
        },
        error: error => {
          console.log(error);
        }
      })
    } else {

      // Si el id de la URL es nulo (crear empleado)...      
      console.log(employee);

      this._employeeService.saveEmployee(employee).subscribe({
        next: data => {
          this.toastr.success('Employee was succesfully registered.', 'Employee registered!');
          this.router.navigate(['/list-employees']);
        },
        error: error => {
          console.log(error);
        }
      })
    }
  }

  // Comprueba si el id de la URL es nulo, y en caso de no serlo (editar),
  // trae desde la base de datos los datos del objeto y los inserta en el formulario.
  editEmployee() {
    if (this.id !== null) {
      this.title = 'Edit Employee';
      this._employeeService.getOneEmployee(this.id).subscribe(data => {
        let date = dateFormat(data.hireDate, "yyyy-mm-dd");
        console.log(date);
        this.employeeForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          departmentID: data.departmentID,
          hireDate: date,
          supervisor: data.extraRoles.supervisor,
          manager: data.extraRoles.manager
        })
      })
    }
  }

}
