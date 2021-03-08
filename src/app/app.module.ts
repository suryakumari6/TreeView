import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {DemoMaterialModule} from '../material-modeule';
import {MatDialog, MatDialogConfig, MatDialogModule,MatDialogRef } from "@angular/material/dialog";
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadComponent,
    HistoryComponent,
    TreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,MatDialogModule,
    MatIconModule,OverlayModule
  ],
  exports: [MatTreeModule, MatIconModule],
  providers: [MatDialog],
  bootstrap: [AppComponent],
})
export class AppModule {}
