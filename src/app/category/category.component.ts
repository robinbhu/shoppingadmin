import { Component, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { Upload } from '../shared/upload';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
// import { shareData } from '../shared/dataSharing.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	public options = {
        position: ["top", "right"],
        timeOut: 0,
        showProgressBar: true,
        lastOnBottom: true
    };
     selectedFiles: FileList;
  currentUpload: Upload;
   private basePath:string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  disabledFlag = true;
  fileurl: string;
  Categories = [];

  constructor(private http: Http, private notificationsService: NotificationsService, 
     private router:Router, 
    private routes: ActivatedRoute) { }

  ngOnInit() {
    this.getCategoryData();
  }

  addCategory(form: NgForm){
    let obj = {name:  form.value.ctName, fileUrl:this.fileurl, id: new Date().getTime()};
    this.http.post('https://authentication-e11e7.firebaseio.com/category.json', obj).subscribe((res)=>{
      this.notificationsService.success(
            'Congrts!!',
            'New Category added successfully'
        );
      this.Categories.push(obj);
      form.reset();
    })
  }

  fileChangeEvent(fileObject){
  	console.log(fileObject);
    this.selectedFiles = fileObject.target.files;
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.pushUpload(this.currentUpload)
  }


  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
       // upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       console.log(snapshot);
       this.disabledFlag = true;
      },
      (error) => {
        console.log(error)
      },
      () => {
        this.fileurl = this.uploadTask.snapshot.downloadURL
        this.disabledFlag = false;
      }
    );
  }

  getCategoryData(){
    this.http.get('https://authentication-e11e7.firebaseio.com/category.json').subscribe((response) => {
      let categoryObject = response.json();
      let keyArray = Object.keys(categoryObject);
      let inputObject = {};
      for(var i=0; i<keyArray.length; i++){
        inputObject = categoryObject[keyArray[i]];
        inputObject['key'] = keyArray[i]; 
        this.Categories.push(inputObject);
      }
      console.log(this.Categories)
    });
  }
  onEditCategoryItem(){
    this.router.navigate(['../edit'], {relativeTo: this.routes})
  }

}
