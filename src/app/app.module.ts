import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from './upload/upload.module';
import { FileModule } from './file/file.module';
import { SpinnerComponent } from './spinner/spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
   HttpClientModule,UploadModule,FileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


//https://malcoded.com/posts/angular-file-upload-component-with-express