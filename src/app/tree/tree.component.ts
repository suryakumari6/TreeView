import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../upload/upload.component';
import { getLocaleDirection } from '@angular/common';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FileNode {
  name: string;
  url: string;
  children?: FileNode[];
}


export class FileNodei {
  name: string = "";
  url: string = "";
  children?: FileNodei[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url:string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fileService: FileService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  fileNameret: string = '';
 

  txtFile: string = '';

  ngOnInit(): void {
    fetch('assets/Sample-Files-Angular.txt')
  .then(response =>
     response.text()
     )
  .then(data => {
  	// Do something with your data
  
    this.txtFile = data;
    this.cfd();
  });

}

public maxlevel:number = 0;
nodePath : any ;


  SelectFile(nodename:string,n:ExampleFlatNode)
  {
//find node


    this.data.fileName=nodename;
this.dialogRef.close(this.data);
  }

  private _transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url:node.url
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  cfd(){
    var latest;
    var rootn :FileNode =  new FileNodei();
    rootn.name="rootn";
    rootn.url="rootn";
    rootn.children = new Array<FileNodei>();
    let dict = new Map();
    dict.set("rootn",rootn);
    var res = this.txtFile.split("\n");
    let existingFiles= this._fileService.GetFiles();
    for (let i = 0; i < res.length; i++) {
      latest=rootn;
      var element = res[i];
      var dirs = element.split("/");
      var isExists = false;
      existingFiles.forEach(function(item: string){ 
        if(element.indexOf(item)>=0) { isExists=true}
      })
      if(!isExists){
      for (let j = 0; j < dirs.length; j++) {
         if(!dict.has(dirs[j])){
          var newo :FileNode =  new FileNodei();
          newo.name = dirs[j];
          newo.url = element;
          //newo.children = new Array<FileNodei>();
          if(latest!=null){
            if(latest.children==undefined ||latest.children==null){
              latest.children = new Array<FileNodei>();
            }
            latest.children.push(newo);
            latest = newo;
            dict.set(dirs[j],newo);

          }
          else{
            if(dict.size==1){
              rootn.children.push(newo);
            }
            dict.set(dirs[j],newo);
            latest = newo;
          }
        }
        else{
          latest = dict.get(dirs[j]);
        }
      
    }
  }
 }

    var s = JSON.stringify(dict.get('rootn'));
    var js = JSON.parse(s);
    if(js!=null && js!=undefined && js.children!=undefined && js.children!=null){
    this.dataSource.data =js.children;
  }

  }
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
