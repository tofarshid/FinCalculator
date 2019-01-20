export interface FormInput {
	custName: string;
	grossIncome: number;
	rentalIncome: number;
	noOfChildren: number;
}

export interface Result {
	incomeTax: number;
	rentalIncome: number;
	totalIncome: number;
	expense: number;
	surplus: number;
}