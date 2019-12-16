import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { MathOprationsService} from '../shared/math-oprations.service';



@Component({
  selector: 'app-math-operations',
  templateUrl: './math-operations.component.html',
  styleUrls: ['./math-operations.component.css'],
  providers: [MathOperationsComponent]
})
export class MathOperationsComponent implements OnInit {

  inputIndex = 0;

  public inputs: any[] = [{
    input: '',
    inputName: this.inputIndex
  }];
  constructor(private mathoperationservice : MathOprationsService,
    private modalService: BsModalService) { 
  }
  sum;
  string_input;
  eval_output;
  math_eval_output;
  arr_input;
  first_largest;
  second_largest;
  
  ngOnInit() {
    this.addInput();
  } 
  errorMessage;

  onAddSubmit(form : NgForm){
    this.mathoperationservice.postAdd(form.value).subscribe(
      (res) => {
        this.sum =res["result"];
      },(error)=>{
        console.log(error)
        this.sum = error.error.Error;
      }
    )
  }

  onStringEval(form : NgForm){
    this.mathoperationservice.stringEval(form.value).subscribe(
      (res) => {
        this.math_eval_output = res["result"];
        this.eval_output = res["evalresult"];
      },(error)=>{
        console.log(error)
        this.eval_output = error.error.Error;
      }
    )
  }

  onArrEval(form : NgForm){
    this.mathoperationservice.arrEval(form.value).subscribe(
      (res) => {
        this.first_largest = res["firstHighest"];
        this.second_largest = res["secondHighest"]
      },(error)=>{
        console.log(error)
        this.first_largest = error.error.Error;
      }
    )
  }
  addInput(){
    this.inputIndex++;
    this.inputs.push({
      input: '',
      inputName : this.inputIndex
    });
    this.errorMessage = '';
    
  }

  removeInput(i){
    if(this.inputs.length > 2){
      this.errorMessage = '';
      this.inputs.splice(i, 1); 
    }
    else{
      this.errorMessage = 'Minimum 2 numbers required';
    }

  }
}
