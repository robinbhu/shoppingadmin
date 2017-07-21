import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Upload } from '../shared/upload';
import { NotificationsService } from 'angular2-notifications';
import { NgForm  } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
selectedItems = []
dropdownList = [];
dropdownSettings = { 
                      singleSelection: true, 
                      text:"Select Category",
                      enableSearchFilter: true
                    }
Categories = [];
selectedCategory = [];
categoryObject = {};
selectedFiles: FileList;
  currentUpload: Upload;
   private basePath:string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  disabledFlag = true;
  fileurl: string;
  	public options = {
        position: ["top", "right"],
        timeOut: 0,
        showProgressBar: true,
        lastOnBottom: true
    };
    selectedCategoryId:string;


  constructor(private http: Http,  private notificationsService: NotificationsService) { }

  ngOnInit() {
  	this.getCategoryData();
  }


  getCategoryData(){
    this.http.get('https://authentication-e11e7.firebaseio.com/category.json').subscribe((response) => {
      this.categoryObject = response.json();
      let keyArray = Object.keys(this.categoryObject);
      let inputObject = {};
      for(var i=0; i<keyArray.length; i++){
      	inputObject = {};
        inputObject['itemName'] = this.categoryObject[keyArray[i]].name;
        inputObject['id'] = keyArray[i];
        this.Categories.push(inputObject);
      }
      console.log(this.Categories)
      this.dropdownList = this.Categories;
    });
  }


  onCategorySelect(data){
  	this.disabledFlag = false;
  	this.selectedCategoryId = data.id;
  	this.selectedCategory = [];
  	let selectedCategoryObject = this.categoryObject[data.id].items;
  	if(selectedCategoryObject){
  		let keyArray = Object.keys(selectedCategoryObject);
      let inputObject = {};
      for(var i=0; i<keyArray.length; i++){
      	inputObject = {};
        inputObject = selectedCategoryObject[keyArray[i]];
        inputObject['id'] = keyArray[i];
        this.selectedCategory.push(inputObject);
      }
      console.log(this.selectedCategory);
  	}
  	
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


  addCategoryItems(form: NgForm){
  	let uploadUrl = 'https://authentication-e11e7.firebaseio.com/category/'+this.selectedCategoryId+'/items/.json'
    let obj = {name:  form.value.itemName, fileUrl:this.fileurl, quantity:  form.value.itemQuantity, price: form.value.itemPrice, description: form.value.itemDes};
    console.log(obj);
    this.http.post(uploadUrl, obj).subscribe((res)=>{
      this.notificationsService.success(
            'Congrts!!',
            'New Category added successfully'
        );
      this.Categories.push(obj);
      form.reset();
    })
  }


  onCategoryDeselect(){
  	this.disabledFlag= true;
  }
}
