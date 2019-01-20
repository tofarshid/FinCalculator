import { Injectable } from '@angular/core';

// add
import { FormInput, Result } from '../models/types';
import { Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinCalculatorService {

  // main Observables for input and output

  formInupt$: Observable<FormInput>;
  result$: Observable<Result> = of( {
                      							incomeTax: 0.00,
                      							rentalIncome: 0.00,
                      							totalIncome: 0.00,
                      							expense: 0.00,
                      							surplus: 0.00
                      						});
  
  expense_data; 

  rates = [ {'limit': 0, 'rate' : 0},
            {'limit': 18200, 'rate' : 0.19 },
            {'limit': 37000, 'rate' : 0.325 },
            {'limit': 87000, 'rate' : 0.37 },
            {'limit': 180000, 'rate' : 0.45 }];

  constructor(private http: HttpClient) { 

    // get expense data from JSON

    this.getExpenseData().subscribe(data => {
      this.expense_data = data;
    });
  }

  getExpenseData() {
    // return this.http.get('http://simpleideas.com.au/FinCalculator/samples.json');
    return this.http.get('../../assets/expense.json');
  }

  calculate(input: FormInput): Observable<Result> {

    // get expense, rate and carry

    const getExpense = (income: number, noOfChildren: number): number => {

      return this.expense_data[noOfChildren][this.getExpenseCategory(income)];
    }

    const getRate = (income: number): number => {

      return this.rates[getRateIndex(income)].rate
    }

    const getCarry = (carry: number, index: number): number => {

      if (index == 0) {
        return 0;
      } else {
        carry = (this.rates[index]['limit'] - this.rates[index - 1]['limit'])
                * this.rates[index - 1]['rate'];
        return (carry + getCarry(carry, index - 1));
      }
    }

    // get array index
    const getRateIndex = (income: number): number => {

      return this.rates.map( e => e.limit).indexOf(Number(this.getIncometaxCategory(income)));
    }

    // main functions to get income tax and rental income

    const calculateIncomeTax = (income: number): number => {

      let incomeTax =  ( income - Number(this.getIncometaxCategory(income)) ) // diff from Limit
                      * getRate(income) // rate
                      + getCarry(0, getRateIndex(income)); // carry

      return Number(incomeTax.toFixed(2));
    }

  	const calculateRentalIncome = (incomeRental): number => {

      return Number((incomeRental * .8).toFixed(2));
  	}

  	return this.result$.pipe(
  		map( data => {

  			data.incomeTax = calculateIncomeTax(input['grossIncome']);
  			data.rentalIncome = calculateRentalIncome(input['rentalIncome']);

        data.totalIncome = Number(input['grossIncome']) + data.rentalIncome - data.incomeTax;
  			data.expense = getExpense(data.totalIncome, Number(input['noOfChildren']));
        data.surplus = Number((data.totalIncome - data.expense).toFixed(2));

  			return data;
  		})
  	);
  }


  // util functions
  getExpenseCategory (totalIncome: number) : string {

    if ( totalIncome < 21000) {
      return '21000';
    } else if (21000 <= totalIncome && totalIncome < 35000) {
      return '35000';
    } else if (35000 <= totalIncome && totalIncome < 75000) {
      return '75000';
    } else if (75000 <= totalIncome && totalIncome < 150000) {
      return '150000';
    } else if (150000 <= totalIncome && totalIncome < 200000) {
      return '200000';
    } else if (200000 <= totalIncome && totalIncome <= 1000000) {
      return '1000000';
    } else if (totalIncome > 1000000){
      return '1000000';
    }
  }

  getIncometaxCategory(totalIncome: number) : string {

    if (totalIncome >= 0 && totalIncome <= 18200) {
      return '0';
    } else if (totalIncome > 18200 && totalIncome <= 37000){
      return '18200';
    } else if (totalIncome > 37000 && totalIncome <= 87000){
      return '37000';
    } else if (totalIncome > 87000 && totalIncome <= 180000){
      return '87000';
    } else if (totalIncome > 180000) {
      return '180000';
    }
  }
}