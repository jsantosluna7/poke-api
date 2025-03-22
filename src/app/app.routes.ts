import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: 'obtener',
        loadComponent: () =>
          import('./components/obtenerpoke/obtenerpoke.component').then(
            (m) => m.ObtenerpokeComponent
          ),
      },
      {
        path: 'tipos',
        loadComponent: () =>
          import('./components/tipospoke/tipospoke.component').then(
            (m) => m.TipospokeComponent
          ),
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('./components/buscarpoke/buscarpoke.component').then(
            (m) => m.BuscarpokeComponent
          ),
      },
    ],
    canActivate: [AuthGuardService]
  },
];
