import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {  MatMenuModule , MatButtonModule, MatIconModule, MatCardModule  } from '@angular/material';

@NgModule({
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        RightSidebarComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        RightSidebarComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule

    ]
})

export class SharedModule {
}
