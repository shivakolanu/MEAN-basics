import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

// interface Numbers{
//   num1: string;
//   num2: string;
//   operation: string;
// }
// interface StringEval{
//   input: string;
//   opertion: string;
// }
@Injectable({
  providedIn: 'root'
})
export class MathOprationsService {

  constructor(private http: HttpClient) { }

  readonly baseURLMath = 'http://localhost:3000/math-operations';
  readonly addition;
  
  postAdd(numbers){
    numbers.operation ="addition";
    return this.http.post(this.baseURLMath, numbers);
  }

  stringEval(input){
    input.operation ="stringEval";
    return this.http.post(this.baseURLMath, input);
  }

  arrEval(input){
    input.operation ="arrEval";
    return this.http.post(this.baseURLMath, input);
  }
}
