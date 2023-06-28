import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { InsertEmployeeComponent } from './components/insert-employee/insert-employee.component'
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { InsertDepartmentComponent } from './components/insert-department/insert-department.component';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { InsertProjectComponent } from './components/insert-project/insert-project.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuQueriesComponent } from './components/menu-queries/menu-queries.component';
import { QueryOneComponent } from './components/query-one/query-one.component';
import { QueryTwoComponent } from './components/query-two/query-two.component';
import { QueryThreeComponent } from './components/query-three/query-three.component';
import { QueryFourComponent } from './components/query-four/query-four.component';

// Rutas
const routes: Routes = [

  { path: '', component: MenuComponent },

  { path: 'insert-employee', component: InsertEmployeeComponent },
  { path: 'edit-employee/:id', component: InsertEmployeeComponent },
  { path: 'list-employees', component: ListEmployeesComponent },

  { path: 'insert-department', component: InsertDepartmentComponent },
  { path: 'edit-department/:id', component: InsertDepartmentComponent },
  { path: 'list-departments', component: ListDepartmentsComponent },

  { path: 'insert-project', component: InsertProjectComponent },
  { path: 'edit-project/:id', component: InsertProjectComponent },
  { path: 'list-projects', component: ListProjectsComponent },

  { path: 'menu-queries', component: MenuQueriesComponent },
  { path: 'menu-queries/query-one', component: QueryOneComponent },
  { path: 'menu-queries/query-two', component: QueryTwoComponent },
  { path: 'menu-queries/query-three', component: QueryThreeComponent },
  { path: 'menu-queries/query-four', component: QueryFourComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
