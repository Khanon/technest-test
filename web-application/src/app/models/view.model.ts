/**
 * View model to be used on pagination component
 */
export interface PaginationDataView {
    length: number;
    pageSize: number;
    pageIndex: number;
    pageSizeOptions: number[];
}

/**
 * View model to be used on tables
 */
export interface TableDataView<T> extends PaginationDataView {
    data: T;
}
