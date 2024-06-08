

import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector       : 'form-transfer',
    templateUrl    : './form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass, MatInputModule,
        TextFieldModule, ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule
    ],
})
export class FormComponent implements OnInit
{
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder
    )
    {
        this.addForm = this._formBuilder.group({
            date: '',
            companie_id: '',
            area_id: '',
            type: '',
            remark: '',
            items: this._formBuilder.array([])
        })
    }

    ngOnInit(): void {

        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the form field helpers as string
     */

    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
}

