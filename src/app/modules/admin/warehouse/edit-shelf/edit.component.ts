

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'shelf-edit',
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
        MatRadioModule
    ],
})

export class EditShelfComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
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
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router

    ) {

    }

    ngOnInit() {

        this.loadTable();

    }
    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }


    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    editElement(element: any) {
        this._router.navigate(['admin/warehouse/edit/chanel/' + element.id])
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
                that._service.getPage(dataTablesParameters).subscribe((resp: any) => {
                    this.dataRow = resp.data.data;
                    this.pages.current_page = resp.data.current_page;
                    this.pages.last_page = resp.data.last_page;
                    this.pages.per_page = resp.data.per_page;
                    if (resp.data.currentPage > 1) {
                        this.pages.begin =
                            parseInt(resp.data.itemsPerPage) *
                            (parseInt(resp.data.currentPage) - 1);
                    } else {
                        this.pages.begin = 0;
                    }

                    callback({
                        recordsTotal: resp.data.total,
                        recordsFiltered: resp.data.total,
                        data: [],
                    });
                    this._changeDetectorRef.markForCheck();
                });
            },
            columns: [
                { data: 'action', orderable: false },
                { data: 'No' },
                { data: 'name' },
                { data: 'picture' },
                { data: 'create_by' },
                { data: 'created_at' },

            ],
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    backTo(element: any): void {
        this._router.navigate(['/admin/warehouse/shelf/:id' + element.id])
    }




}


