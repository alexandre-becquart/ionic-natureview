import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NatureView } from 'src/app/shared/models/NatureView';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.page.html',
  styleUrls: ['./single-view.page.scss'],
})
export class SingleViewPage implements OnInit {

  natureView: NatureView;
  navParams: { [k: string]: any; };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.natureView = this.router.getCurrentNavigation().extras.state.natureView;
      console.log(this.navParams);
      // this.mode = this.navParams?.data?.mode || 'connect';
    });
  }



}
