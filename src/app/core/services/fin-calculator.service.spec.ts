import { TestBed, ComponentFixture, getTestBed, async } from '@angular/core/testing';

//add

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FinCalculatorService } from './fin-calculator.service';
import { Observable } from 'rxjs';
import { FormInput, Result } from '../models/types';

describe('FinCalculatorService', () => {

  const sampleData = require('../../../assets/samples.json');

  let finCalculatorService: FinCalculatorService;
  

  beforeEach(() => TestBed.configureTestingModule({
  	imports: [HttpClientTestingModule],
  	providers: [FinCalculatorService]
  }));

  it('should be created', () => {
    const service: FinCalculatorService = TestBed.get(FinCalculatorService);
    expect(service).toBeTruthy();
  });

  describe("should check 100 samples", function() {

    beforeEach(() => {
      finCalculatorService = TestBed.get(FinCalculatorService);
      finCalculatorService.expense_data = require('../../../assets/expense.json');
    });

    for(let elem in sampleData) {
      it('given data[`income`:' + sampleData[elem].income 
        +',`rentalincome`:' 
        + sampleData[elem].rentalincome 
        +'`noofchild`:' + sampleData[elem].noofchild +'] should PASS', () => {
        finCalculatorService.calculate({
             'custName': 'string',
             'grossIncome': sampleData[elem].income,
             'rentalIncome': sampleData[elem].rentalincome,
             'noOfChildren': sampleData[elem].noofchild,
        }).subscribe(
          data => {
            expect(data['incomeTax']).toBe(sampleData[elem].incometax);
            expect(data['rentalIncome']).toBe(sampleData[elem].rentalincomeaftertax);
            expect(data['totalIncome']).toBe(sampleData[elem].totalincome);
            expect(data['expense']).toBe(sampleData[elem].expense);
            expect(data['surplus']).toBe(sampleData[elem].surplus);
          }
        );
      });
    }
  });
});
