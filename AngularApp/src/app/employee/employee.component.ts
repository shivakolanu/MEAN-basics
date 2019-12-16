import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  modalRef: BsModalRef;

  constructor(private employeeService: EmployeeService,
    private modalService: BsModalService) { 
    
  }
  num1 ; 
  num2 ;
  sum;
  disable_reset : boolean = false;
  selected_employee_id : string;
  selected_form : NgForm;

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form : NgForm){
    console.log(form.value._id)
    if(form.value._id == "" || form.value._id == null){
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        console.log(this.employeeService.selectedEmployee);
        this.refreshEmployeeList();
        this.resetForm(form);
        console.log(this.employeeService.selectedEmployee);
      })
    }
    else{
      console.log(this.employeeService.selectedEmployee);
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        this.disable_reset = false ;
      })
    }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
    this.disable_reset = true ;
  }

  deleteConfirmation(){ 
    this.employeeService.deleteEmployee(this.selected_employee_id).subscribe((res) =>{
      this.modalRef.hide();
      this.refreshEmployeeList();
      this.resetForm(this.selected_form);
    })
  }

  onDelete(_id: string, form: NgForm, delete_confirmation_modal: TemplateRef<any>){
    this.selected_employee_id = _id;
    this.selected_form = form;
    this.modalRef = this.modalService.show(delete_confirmation_modal);
  }
}
