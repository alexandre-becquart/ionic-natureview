import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriptionBaseComponent implements OnDestroy {
    subscription: Subscription = new Subscription();
    constructor() { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
