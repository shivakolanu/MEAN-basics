import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
// import { map } from  'rxjs/add/operators';
// import { toPromise} from 'rxjs/add/operators';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];

  readonly baseURL = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee){
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList(){
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee){
    return this.http.put(this.baseURL+`/${emp._id}`, emp)
  }

  deleteEmployee(_id: string){
    return this.http.delete(this.baseURL+ `/${_id}`);
  }
}
