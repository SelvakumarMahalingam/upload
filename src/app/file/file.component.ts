import { Component, OnInit ,Inject, SimpleChange, ElementRef,ViewChild} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare var jquery:any;
declare var $ :any;
export interface DialogData {
  
  progress: number;
}
const URL = 'http://cdn.test.wayfinding-product.tk/file';
const URL1='https://evening-anchorage-3159.herokuapp.com/api/'
const authToken='eyJ1c2VySWQiOiIxIiwicGVybWlzc2lvbiI6W3sibW9kdWxlTmFtZSI6IkJMT0NLIE5PIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJCVUlMRElORyBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiQ0FURUdPUlkgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IkNMSUVOVCBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiQ01TIFBBUkFNRVRFUlMgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IkRFUEFSVE1FTlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IkZBQ0lMSVRZIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJGQUNJTElUWSBQQVJBTUVURVIgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IklNUE9SVCBFWFBPUlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IklOVEVSQUNUSVZFIENPTlRFTlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IklOVEVSQUNUSVZFIEtJT1NLIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJMQU5HVUFHRSBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiTk9OIElOVEVSQUNUSVZFIENPTlRFTlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6Ik5PTiBJTlRFUkFDVElWRSBLSU9TSyBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiUE9JIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJST0xFIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJTQ1JFRU4gU0FWRVIgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlNJWkUgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlRZUEUgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlVTRVIgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlpPTkUgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9XSwiZmlyc3ROYW1lIjoidXNlciIsImxhc3ROYW1lIjoidXNlciIsImVtYWlsSWQiOiJhZG1pbkBoYWt1bmFtYXRhdGEuaW4iLCJyb2xlSWQiOiIxIiwicHJpbWFyeUxhbmdJZCI6IkhnRlAiLCJzZWNvbmRhcnlMYW5nSWQiOiJMQU5HOmVqaGwiLCJwcmltYXJ5TGFuIjoiRW5nbGlzaCIsInNlY29uZGFyeUxhbiI6IkFyYWJpYyJ9'
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  uploader: FileUploader;
  success=false;
  Canceled=false;
  constructor(public dialog: MatDialog) { }
  progress; 
  
  ngOnChanges(changes: SimpleChange) {
    if(changes['value']){
     console.log(changes)
    }
  }
  
  ngOnInit() {
    
    

   

    this.uploader = new FileUploader({
      url: URL1,
     
      isHTML5: true,
    // authTokenHeader:'Authorization',
    //authToken:'Bearer ' + (authToken),
      //disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
     // formatDataFunctionIsAsync: false
     });
     this.uploader.onAfterAddingAll = (item) => {
      this.success=false;
   //   console.log(item)
    };
    this.uploader.onCancelAll = () => {
      //this.openDialog();
      //this.Canceled=true;
     // this.success=false;
      
     //console.log("Can")
    };
    
     this.uploader.onCompleteAll = (response) => {
    console.log(response);
      if(response == 0){
        this.success=false;
        this.Canceled=true;
      }
      else{
        this.success=true;
        this.Canceled=false;
      }
    
    };
    this.uploader.onCompleteItem = (res) => {
     // console.log(res)
    };
  
  this.uploader.onBeforeUploadItem = (res) => {
 // console.log(res)
  };
    
    this.uploader.onProgressAll = (progress) => {
      //console.log(progress)
      
     this.progress=progress;
    };
    
    this.uploader.response.subscribe(
      res => {
         //console.log(res);
        
        let status = JSON.parse(JSON.stringify(res))
       
      },error =>{
       // console.log(error);
        
      });
 
  }
 
  formatSubtitle (percent){
  
    if(percent >= 100){
      return 'Success'
    }else if(percent > 0){
      return "Progress"
    }else {
      return "Not started"
    }
  }
  formatSubtitle1 (percent){
  
    if(percent == 100){
      return 'Completed'!
    }else if(percent > 0){
      return "Progress"
    }else {
      return "Not started"
    }
  }
  openDialog(uploader): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {uploader: uploader}
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
   
    });
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
            
    console.log(data)

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatSubtitle (percent){
  
    if(percent >= 100){
      return 'Congratulations'!
    }else if(percent >= 50){
      return "Half"
    }else if(percent > 0){
      return "Just began"
    }else {
      return "Not started"
    }
  }

}
