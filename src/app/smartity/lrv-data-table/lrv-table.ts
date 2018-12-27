import { Headers } from "@angular/http";

export class LrvTable {
    service: LrvTableService;
    column: Array<LrvTableColumn>;
    order: LrvTableOrder;
    show_btn: boolean;
}

export class LrvTableService {
    public static GET = 1;
    //public static POST = 2;
    METHOD: number;
    name: string;
    header: Headers
}

export class LrvTableColumn {
    public static STRING = 1;
    public static DATE = 2;
    public static NUMBER = 3;
    public static MONEY = 4;
    public static BOOLEAN = 5;
    TYPE: number;
    filter: boolean;  
    db_name: string;
    name: string;
    ord?: number;
    data?: Array<LrvTableColumnData>;
}

export class LrvTableColumnData {
    key: any;
    value: any;
}

export class LrvTableOrder {
    public static DESC = 1;
    public static ASC = 2;
    order: number;
    column: LrvTableColumn
}
