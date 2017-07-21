import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { DataSharingService } from './shared/dataSharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLogin = false;
  constructor(private http: Http, private dataSharingService: DataSharingService){}
  ngOnInit(){
  	firebase.initializeApp({
         apiKey: "AIzaSyCZEcgjKkgKKvv26-dFjRnadUF0PirQ-80",
         authDomain: "authentication-e11e7.firebaseapp.com",
         databaseURL: "https://authentication-e11e7.firebaseio.com",
         projectId: "authentication-e11e7",
         storageBucket: "authentication-e11e7.appspot.com",
         messagingSenderId: "647937281865"
       });

    this.dataSharingService.loginData.subscribe(data=>{
      this.isLogin = true;
    })

    var loginData = localStorage.getItem("login");
    if(loginData == "true"){
      this.isLogin = true;
    }
  }

  getData(){
    this.http.get('http://localhost:3000/tasks')
      .subscribe(data=>{
        console.log("data", data);
      }, err=>{
        console.log("err", err)
      })
  };

  fileUpload(event){
    console.log(event);
    var fileObject = {file: event.target.files[0]};
    console.log(fileObject);
    this.http.post('http://localhost:3000/fileupload', fileObject)
      .subscribe(data=>{
        console.log("data", data);
      }, err=>{
        console.log("err", err)
      })
  }

}
