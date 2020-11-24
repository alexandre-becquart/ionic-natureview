import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NatureView } from '../models/NatureView';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class NatureViewService {

  private natureViewList: NatureView[] = [];
  natureViewList$ = new Subject<NatureView[]>();

  constructor(
    private storage: Storage
  ) { }

  emitList(): void {
    this.natureViewList$.next(this.natureViewList);
  }

  addNatureView(view: NatureView): void {
    this.natureViewList.push(view);
    this.saveList();
    this.emitList();
  }

  saveList(): void {
    this.storage.set('views', this.natureViewList);
  }

  fetchList(): void {
    this.storage.get('views').then(
      (list) => {
        if (list && list.length) {
          this.natureViewList = list.slice();
        }
        this.emitList();
      });
  }
}
