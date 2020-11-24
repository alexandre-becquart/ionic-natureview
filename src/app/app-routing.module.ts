import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SingleViewPage } from './pages/home/single-view/single-view.page';
import { NewViewPage } from './pages/new-view/new-view.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'add',
    component: NewViewPage
  },
  {
    path: 'single-view',
    component: SingleViewPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
