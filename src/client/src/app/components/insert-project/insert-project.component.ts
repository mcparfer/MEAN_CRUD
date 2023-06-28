import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import dateFormat, { masks } from "dateformat";
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-insert-project',
  templateUrl: './insert-project.component.html',
  styleUrls: ['./insert-project.component.css']
})
export class InsertProjectComponent implements OnInit {

  id: string | null;

  title = 'Project Registration Form';

  option = null;
  listEmployees: any = [];

  projectForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _projectService: ProjectService,
    private aRouter: ActivatedRoute,
    private _employeeService: EmployeeService) {
    this.projectForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      ownerID: ['', Validators.required],
      budget: [0, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      expectedEarnings: [0, Validators.required],
      finalEarnings: undefined
    });

    this.id = this.aRouter.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.editProject();
    this.getEmployees();
  }

  showMoney: boolean = true
  toggleMoney() { this.showMoney = !this.showMoney; }

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

  addProject() {

    let id = this.projectForm.get('id')?.value
    let name = this.projectForm.get('name')?.value
    let ownerID = this.projectForm.get('ownerID')?.value
    let budget = this.projectForm.get('budget')?.value
    let startDate = this.projectForm.get('startDate')?.value
    let endDate = this.projectForm.get('endDate')?.value
    let expectedEarnings = this.projectForm.get('expectedEarnings')?.value
    let finalEarnings = this.projectForm.get('finalEarnings')?.value

    let project = new Project(id, name, ownerID, budget, startDate, endDate, expectedEarnings, finalEarnings)
    console.log(project)
    
    if (this.id !== null) {

      this._projectService.editProject(id, project).subscribe({
        next: data => {
          console.log(project);
          this.toastr.info('Project was succesfully edited.', 'Project Edited!');
          this.router.navigate(['/list-projects']);
        },
        error: error => {
          console.log(error);
        }
      })
    } else {

      console.log(project);

      this._projectService.saveProject(project).subscribe({
        next: data => {
          this.toastr.success('Project was succesfully registered.', 'Project registered!');
          this.router.navigate(['/list-projects']);
        },
        error: error => {
          console.log(error);
        }
      })
    }
  }

  editProject() {
    if (this.id !== null) {
      this.title = 'Edit Project';
      this._projectService.getOneProject(this.id).subscribe(data => {
        let dateStart = dateFormat(data.duration.start, "yyyy-mm-dd");
        let dateEnd = dateFormat(data.duration.end, "yyyy-mm-dd");
        this.projectForm.setValue({
          id: data._id,
          name: data.name,
          ownerID: data.ownerID,
          budget: data.budget,
          startDate: dateStart,
          endDate: dateEnd,
          expectedEarnings: data.earnings.expected,
          finalEarnings: data.earnings.obtained
        })
      })
    }
  }

}
