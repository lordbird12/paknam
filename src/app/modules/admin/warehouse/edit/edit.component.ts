

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormDialogComponent } from '../../shelf/form-dialog/form-dialog.component';
import { PageService } from '../page.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DataTablesModule } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'warehouse-edit',
    templateUrl: './edit.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
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
        MatPaginatorModule,
        MatTableModule,
        DataTablesModule,
        MatRadioModule,
        MatTabsModule
    ],
})

export class EditComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    Id: any;
    public dataRow: any[];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    status: any[] = [
        {
            id: 1,
            name: 'เปิดใช้งาน'
        }, {
            id: 0,
            name: 'ไม่เปิดใช้งาน'
        },
    ];
    dataGrid: any[];
    warehouseData: any;
    form: FormGroup;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,

    ) {
        this.form = this._formBuilder.group({
            id: '',
            detail : '',
            name: '',
            status: '',
        })

    }

    ngOnInit() {
        this.Id = this._activatedRoute.snapshot.paramMap.get('id');
        this._service.getWarehouse(this.Id).subscribe((resp: any) => {
            this.warehouseData = resp.data;
            this.dataGrid = this.warehouseData.shelfs;
            this.form.patchValue({
                ...this.warehouseData
            })
            this._changeDetectorRef.detectChanges();
        })
        this.loadTable();
    }
    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }


    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    editElement(element: any) {
        this._router.navigate(['admin/warehouse/edit/shelf/' + element.id])
    }
    addElement() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //    console.log(result,'result')
            }
        });
    }
    addShelf() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //    console.log(result,'result')
            }
        });
    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 25,
            serverSide: true,
            processing: true,
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json",
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                that._service.getPageShelf(dataTablesParameters).subscribe((resp: any) => {
                    this.dataRow = resp.data;
                    this.pages.current_page = resp.current_page;
                    this.pages.last_page = resp.last_page;
                    this.pages.per_page = resp.per_page;
                    if (resp.current_page > 1) {
                        this.pages.begin =
                            resp.per_page * resp.current_page - 1;
                    } else {
                        this.pages.begin = 0;
                    }

                    callback({
                        recordsTotal: resp.total,
                        recordsFiltered: resp.total,
                        data: [],
                    });
                    this._changeDetectorRef.markForCheck();
                });
            },
            columns: [
                { data: 'no' },
                { data: 'name' },
                { data: 'name' },
                { data: 'name' },
                { data: 'name' },
                { data: 'name' },
                { data: 'created_at' },
                { data: 'action' },
            ],
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }







}


