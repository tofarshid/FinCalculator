import { NgModule } from '@angular/core';
import {
	MatToolbarModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatStepperModule
} from '@angular/material';

@NgModule({
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatStepperModule
	],
	exports: [
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatStepperModule
	]
})
export class MaterialModule {

}