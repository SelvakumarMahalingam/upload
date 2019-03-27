import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import {RequestOptions, Request, RequestMethod, Headers} from '@angular/http';

const url = 'https://evening-anchorage-3159.herokuapp.com/api/';

const authToken='eyJ1c2VySWQiOiIxIiwicGVybWlzc2lvbiI6W3sibW9kdWxlTmFtZSI6IkJMT0NLIE5PIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJCVUlMRElORyBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiQ0FURUdPUlkgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IkNMSUVOVCBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiQ01TIFBBUkFNRVRFUlMgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IkRFUEFSVE1FTlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IkZBQ0lMSVRZIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJGQUNJTElUWSBQQVJBTUVURVIgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IklNUE9SVCBFWFBPUlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IklOVEVSQUNUSVZFIENPTlRFTlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IklOVEVSQUNUSVZFIEtJT1NLIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJMQU5HVUFHRSBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiTk9OIElOVEVSQUNUSVZFIENPTlRFTlQgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6Ik5PTiBJTlRFUkFDVElWRSBLSU9TSyBNQU5BR0VNRU5UIiwiaXNWaWV3Ijp0cnVlLCJpc0NyZWF0ZSI6dHJ1ZSwiaXNFZGl0Ijp0cnVlLCJpc0RlbGV0ZSI6dHJ1ZX0seyJtb2R1bGVOYW1lIjoiUE9JIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJST0xFIE1BTkFHRU1FTlQiLCJpc1ZpZXciOnRydWUsImlzQ3JlYXRlIjp0cnVlLCJpc0VkaXQiOnRydWUsImlzRGVsZXRlIjp0cnVlfSx7Im1vZHVsZU5hbWUiOiJTQ1JFRU4gU0FWRVIgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlNJWkUgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlRZUEUgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlVTRVIgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9LHsibW9kdWxlTmFtZSI6IlpPTkUgTUFOQUdFTUVOVCIsImlzVmlldyI6dHJ1ZSwiaXNDcmVhdGUiOnRydWUsImlzRWRpdCI6dHJ1ZSwiaXNEZWxldGUiOnRydWV9XSwiZmlyc3ROYW1lIjoidXNlciIsImxhc3ROYW1lIjoidXNlciIsImVtYWlsSWQiOiJhZG1pbkBoYWt1bmFtYXRhdGEuaW4iLCJyb2xlSWQiOiIxIiwicHJpbWFyeUxhbmdJZCI6IkhnRlAiLCJzZWNvbmRhcnlMYW5nSWQiOiJMQU5HOmVqaGwiLCJwcmltYXJ5TGFuIjoiRW5nbGlzaCIsInNlY29uZGFyeUxhbiI6IkFyYWJpYyJ9'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  options;


  public upload(files: Set<File>): {[key:string]:Observable<number>} {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('File', file, file.name);
        
      // create a http-post request and pass the form
      // tell it to report the upload progress
      
     
       
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type':'form-data','Accept': 'application/json', 'authorization':'Bearer '+atob(authToken)})
      };
      
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true,
        headers:httpOptions.headers
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      },
     );

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
