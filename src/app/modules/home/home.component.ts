import { Component } from '@angular/core';

// add
import { FormBuilder, Validators } from '@angular/forms';
import { FinCalculatorService } from '../../core/services/fin-calculator.service';
import { Observable } from 'rxjs';
import { Result } from '../../core/models/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  result$: Observable<Result>

  finCalcForm = this.fb.group({
  	custName: ['', Validators.required],
  	grossIncome: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
  	rentalIncome: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
  	noOfChildren: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(10), Validators.min(0)]]
  });

  constructor( private fb: FormBuilder, private finCalculatorService: FinCalculatorService ) { 
    this.result$ = finCalculatorService.result$;
  }

  get custName() {
    return this.finCalcForm.get('custName');
  }
  get grossIncome() {
    return this.finCalcForm.get('grossIncome');
  }  
  get rentalIncome() {
    return this.finCalcForm.get('rentalIncome');
  } 
  get noOfChildren() {
    return this.finCalcForm.get('noOfChildren');
  }

  onSubmit() {
    this.result$ = this.finCalculatorService.calculate(this.finCalcForm.value);
  }
}