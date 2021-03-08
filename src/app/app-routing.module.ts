import { HistoryComponent } from './history/history.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UploadComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'tree', component: TreeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
