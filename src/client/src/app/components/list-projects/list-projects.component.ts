import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  listProject: any = [];

  constructor(private _projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this._projectService.getProject().subscribe({
      next: data => {
        console.log(data);
        this.listProject = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteProject(id: any) {
    this._projectService.deleteProject(id).subscribe({
      next: data => {
        this.toastr.error('Project was succesfully deleted.', 'Project Deleted!');
        this.getProjects();
      },
      error: error => {
        console.log(error);
      }
    })

  }

  showName: boolean = true
  showOwner: boolean = true
  showStart: boolean = true
  showEnd: boolean = true
  showBudget: boolean = true
  showExpected: boolean = true
  showFinal: boolean = true

  toggleName() { this.showName = !this.showName; }
  toggleOwner() { this.showOwner = !this.showOwner; }
  toggleStart() { this.showStart = !this.showStart; }
  toggleEnd() { this.showEnd = !this.showEnd; }
  toggleBudget() { this.showBudget = !this.showBudget; }
  toggleExpected() { this.showExpected = !this.showExpected; }
  toggleFinal() { this.showFinal = !this.showFinal; }


}
