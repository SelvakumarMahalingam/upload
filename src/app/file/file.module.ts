import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent, DialogOverviewExampleDialog } from './file.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatIconModule, MatProgressSpinnerModule,MatDialogModule } from '@angular/material';
import {} from '@angular/material/dialog';
@NgModule({
  declarations: [FileComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,FileUploadModule,NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      maxPercent: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      subtitle:["working",
  "in",
  "progress"]
    }),
    MatIconModule,MatProgressSpinnerModule,MatDialogModule
  ],
  exports: [FileComponent],
  entryComponents:[DialogOverviewExampleDialog]
})
export class FileModule { }
