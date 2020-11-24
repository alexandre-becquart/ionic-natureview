import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NatureView } from 'src/app/shared/models/NatureView';
import { NatureViewService } from 'src/app/shared/services/nature-view.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  natureViewList: NatureView[];
  natureViewListSubscription: Subscription;

  constructor(
    private natureViewService: NatureViewService,
    private cdr: ChangeDetectorRef,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.natureViewListSubscription = this.natureViewService.natureViewList$.subscribe(
      (natureViews: NatureView[]) => {
        this.natureViewList = natureViews;
      });
    this.natureViewService.fetchList();
  }


  goAddNatureView(): void {
    this.navCtrl.navigateForward('/add');
  }

  onLoadNatureView(view: NatureView): void {
    const navigationExtras: NavigationExtras = {
      state: {
        natureView: view
      }
    };
    this.navCtrl.navigateForward('/single-view', navigationExtras);
  }

  // private initSub(): void {
  //   this.subscription.add(
  //     this.natureViewService.natureViewList$.asObservable().subscribe(nV => {
  //       this.natureViewList = nV;
  //       this.cdr.detectChanges();
  //       this.natureViewService.fetchList();
  //     })
  //   );
  // }

  ngOnDestroy(): void {
    this.natureViewListSubscription.unsubscribe();
  }


}
