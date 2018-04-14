import { Input } from '@angular/core';

export abstract class BaseModel{

    public model: any = {};
    @Input() numId: any;
    @Input() strAction: any;
    
}
