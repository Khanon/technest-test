import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationDataView } from '../../models/view.model';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() dataView: PaginationDataView;
    @Input() onUpdate: () => {};
    constructor() { }

    ngOnInit(): void { }

    updatePageConfig(event?: PageEvent) {
        this.dataView.pageSize = event.pageSize;
        this.dataView.pageIndex = event.pageIndex;
        this.onUpdate();
    }
}
