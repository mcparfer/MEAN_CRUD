import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-insert-department',
  templateUrl: './insert-department.component.html',
  styleUrls: ['./insert-department.component.css']
})
export class InsertDepartmentComponent implements OnInit {

  id: string | null;

  title = 'Department Registration Form';

  data = {
    contactInfo: [
      {
        number: '',
        type: ''
      }
    ]
  };

  dptForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _departmentService: DepartmentService,
    private aRouter: ActivatedRoute) {
    this.dptForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      contactInfo: this.fb.array([]),
      shifts: ['', Validators.required],
    });

    this.setContactInfo();

    this.id = this.aRouter.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.editDepartment()
  }

  get contactFormArr(): FormArray {
    return this.dptForm.get('contactInfo') as FormArray;
  }

  addNewContact() {
    this.contactFormArr.push(
      this.fb.group({
        number: [''],
        type: ['']
      })
    );
  }

  deleteContact(i: any) {
    this.contactFormArr.removeAt(i);
  }

  setContactInfo() {
    this.data.contactInfo.forEach(x => {
      this.contactFormArr.push(
        this.fb.group({
          number: x.number,
          type: x.type
        })
      );
    });
  }

  addDepartment() {

    let id = this.dptForm.get('id')?.value
    let name = this.dptForm.get('name')?.value
    let contactInfo = this.dptForm.get('contactInfo')?.value
    let shifts = this.dptForm.get('shifts')?.value.toString().split(",")

    let department = new Department(id, name, contactInfo, shifts)

    if (this.id !== null) {

      this._departmentService.editDepartment(id, department).subscribe({
        next: data => {
          console.log(department);
          this.toastr.info('Department was succesfully edited.', 'Department Edited!');
          this.router.navigate(['/list-departments']);
        },
        error: error => {
          console.log(error);
        }
      })
    } else {

      console.log(department);

      this._departmentService.saveDepartment(department).subscribe({
        next: data => {
          console.log(department);
          this.toastr.success('Departament was succesfully registered', 'Departament registered!');
          this.router.navigate(['/list-departments']);
        },
        error: error => {
          console.log(error);
        }
      })

    }

  }

  editDepartment() {
    if (this.id !== null) {
      this.title = 'Edit Department';
      this._departmentService.getOneDepartment(this.id).subscribe({
        next: data => {
          if (data.contactInfo.length == 0) {
            this.deleteContact(i);
          } else {
            for (let i = 1; i < data.contactInfo.length; i++) {
              this.addNewContact();
            };
          };
          this.dptForm.patchValue({
            id: data._id,
            name: data.name,
            contactInfo: data.contactInfo,
            shifts: data.shifts
          })
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}

function i(i: any) {
  throw new Error('Function not implemented.');
}
