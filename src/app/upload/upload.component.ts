import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { FlatTreeControl } from '@angular/cdk/tree';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TreeComponent } from '../tree/tree.component';
//import { MatDialog } from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatDialogModule,MatDialogRef } from "@angular/material/dialog";


export interface DialogData {
  fileName: string;
  Path: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(
    private _fileService: FileService
    ,private _dialog: MatDialog
    ) {
      var io= 100;
    }
  fileName: string = '';
  isEnable: boolean = false;
  isVisible: boolean = false;
  alertFlag: boolean = false;
  fileNameret: string = '';
 Pathret: string = '';

  ngOnInit(): void {}

  fileChangeEvent(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.fileName = fileList ? fileList[0].name : '';
    this.isEnable = false;
  }

  showProgress() {
    
    this.isVisible = true;

this._fileService.AddFileName(this.fileName);

    setTimeout(()=>
    {this.isVisible = false;
      this.alertFlag = true;
      this.fileName = '';
      this.isEnable = false;}
      , 5000);

  }
  openDialog(): void {
    const dialogRef = this._dialog.open(TreeComponent, {
     width: '550px',
     height:'900px',
     data: {fileName: this.fileNameret, path: this.Pathret}
    });
    //dialogRef.close();
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      {
        this.fileName =  result.fileName;
        this.alertFlag=false;
        this.isEnable=true;
      }
    });
  }
}
