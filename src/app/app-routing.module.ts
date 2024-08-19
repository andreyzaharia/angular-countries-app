import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
  /*{
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },*/
  {
    //es un lazy load/ lazy chunk file
    path: 'countries',
    loadChildren: () =>
      // cuando entra en el path, ya se cargan los demas modulos dentro de ese router para evitar tener todo cargado en memoria
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
  {
    //si elusuario utiliza otra ruta no existente redirige al home
    path: '**',
    redirectTo: 'countries',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
