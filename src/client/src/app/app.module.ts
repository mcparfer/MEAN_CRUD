import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Componentes, directivas, pipes...
import { AppComponent } from './app.component';
import { InsertEmployeeComponent } from './components/insert-employee/insert-employee.component';
import { InsertDepartmentComponent } from './components/insert-department/insert-department.component';
import { InsertProjectComponent } from './components/insert-project/insert-project.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { YesNoPipe } from './yes-no.pipe';
import { SortDirective } from './directives/sort.directive';
import { MenuComponent } from './components/menu/menu.component';
import { MenuQueriesComponent } from './components/menu-queries/menu-queries.component';
import { QueryOneComponent } from './components/query-one/query-one.component';
import { QueryTwoComponent } from './components/query-two/query-two.component';
import { QueryThreeComponent } from './components/query-three/query-three.component';
import { QueryFourComponent } from './components/query-four/query-four.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertEmployeeComponent,
    InsertDepartmentComponent,
    ListEmployeesComponent,
    ListDepartmentsComponent,
    YesNoPipe,
    SortDirective,
    InsertProjectComponent,
    ListProjectsComponent,
    MenuComponent,
    MenuQueriesComponent,
    QueryOneComponent,
    QueryTwoComponent,
    QueryThreeComponent,
    QueryFourComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
