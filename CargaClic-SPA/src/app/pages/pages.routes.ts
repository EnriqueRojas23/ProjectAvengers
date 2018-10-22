import { RouterModule, Routes } from '@angular/router';




import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
const pagesRoutes: Routes = [

    {path : 'dashboard', component : DashboardComponent } ,
    {path : 'progress', component : ProgressComponent} ,
    {path : 'graficas1', component : Graficas1Component} ,
    {path : 'account-settings', component : AccountSettingsComponent} ,
    {path : '', redirectTo : '/dashboard', pathMatch: 'full'},
    // {path : '**', component : NopagefoundComponent}

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

