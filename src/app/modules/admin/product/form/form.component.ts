import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { Service } from '../page.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
    selector: 'form-product',
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        CommonModule,
        NgxDropzoneModule,
    ],
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    fixedSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);

    item1Data: any = [];
    item2Data: any = [];
    itemSupplier: any = [];

    itemArea: any = [];
    itemShelve: any = [];
    itemFloor: any = [];
    itemChannel: any = [];

    formData: FormGroup;
    formData2: FormGroup;

    files: File[] = [];
    warehouseData: any;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async ngOnInit(): Promise<void> {
        this.formData = this._formBuilder.group({
            category_product_id: ['', Validators.required],
            sub_category_product_id: ['', Validators.required],
            name: [''],
            detail: [''],
            qty: [''],
            sale_price: [''],
            cost: [''],
            type: [''],
            min: [''],
            max: [''],
            supplier_id: [''],
        });

        this.formData2 = this._formBuilder.group({
            area_id: [''],
            shelve_id: [''],
            floor_id: [''],
            channel_id: [''],
        });

        this.getCategories();
        this.getSuppliers();
        this.getArea();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
    }

    getCategories(): void {
        this._Service.getCategories().subscribe((resp) => {
            this.item1Data = resp.data;
        });
    }

    getSuppliers(): void {
        this._Service.getSuppliers().subscribe((resp) => {
            this.itemSupplier = resp.data;
        });
    }

    getArea(): void {
        this._Service.getArea().subscribe((resp) => {
            this.itemArea = resp.data;
        });
    }

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    somethingChanged(event: any): void {
        this.item2Data = event.value;
    }

    somethingAreaChanged(event: any): void {
        this.itemShelve = event.value;
    }

    somethingShelfChanged(event: any): void {
        this.itemFloor = event.value;
    }

    somethingFloorChanged(event: any): void {
        this.itemChannel = event.value;
    }

    somethingChannelChanged(event: any): void {
        this.itemChannel = event.value;
    }

    onSelect(event) {
        this.files.push(...event.addedFiles);
        // Trigger Image Preview
        setTimeout(() => {
            this._changeDetectorRef.detectChanges();
        }, 150);
      
    }

    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);

    }

    New(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'เพิ่มรายการใหม่',
            message: 'คุณต้องการเพิ่มรายการใหม่ใช่หรือไม่ ',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                const formData = new FormData();
                Object.entries(this.formData.value).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                    }
                );

                Object.entries(this.formData2.value).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                    }
                );

                for (var i = 0; i < this.files.length; i++) {
                    formData.append('images[]', this.files[i]);
                }

                this._Service.new(formData).subscribe({
                    next: (resp: any) => {
                        this._router
                            .navigateByUrl('product/list')
                            .then(() => {});
                    },
                    error: (err: any) => {
                        this._fuseConfirmationService.open({
                            title: 'กรุณาระบุข้อมูล',
                            message:
                                'ไม่สามารถบันทึกข้อมูลได้กรุณาตรวจสอบใหม่อีกครั้ง',
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warning',
                            },
                            actions: {
                                confirm: {
                                    show: false,
                                    label: 'ยืนยัน',
                                    color: 'primary',
                                },
                                cancel: {
                                    show: false,
                                    label: 'ยกเลิก',
                                },
                            },
                            dismissible: true,
                        });
                    },
                });
            }
        });
    }
}
