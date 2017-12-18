import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MyPics} from '../resources/data/mypics';
import {Mygallery} from '../resources/data/gallery';
import {AuthService} from 'aurelia-auth'; 




@inject(Router, MyPics, AuthService, Mygallery)
export class List {
  constructor(router, mypics, auth, mygalleries) {
  this.mypics = mypics;
  this.router = router;
  this.mygalleries = mygalleries;
  this.message = 'List';
  this.auth = auth;
  this.user = JSON.parse(sessionStorage.getItem('user'));
  this.showing = "mypicList";
  
  }
  async activate(){
		await this.mypics.getUserMypics(this.user._id);
	}

  createMypic(){	
		this.mypicObj = {
			mypic: "",
      dateCreated: new Date(),
      description: "",
			userId: this.user._id,
		
		}
		this.showing = 'mypicForm';		
  }

  createPhotos(){	
		this.mypicObj = {
	// 		mypic: "",
  //     dateCreated: new Date(),
  //     description: "",
      userId: this.user._id,
      Id: this.selectedgallery
		
		}
		this.showing = 'photoForm';		
  }
  
     editMypic(mypic){
            this.mypicObj = mypic;
            this.showing = 'mypicForm';	
        } 

    editPhotos(mypic){
             this.mypicObj = mypic;
              this.showing = 'photoForm';	
    }

       deleteMypic(mypic){
              this.mypics.deleteMypic(mypic._id);
          }

      deletePhotos(mypic){
                this.mygalleries.deleteMypic(mypic._id);
            }
      
      back(){
        this.showing = "mypicList";
    }

    backPhotos(){
      this.showing = "photoList";
  }
	async saveMypic(){
		if(this.mypicObj){		
			let response = await this.mypics.save(this.mypicObj);
			if(response.error){
				alert("There was an error creating the Mypic");
			} else {
				    var mypicId = response._id;
                        if(this.filesToUpload && this.filesToUpload.length){
                            await this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicId);
                            this.filesToUpload = [];
                        }
          
			}
			this.showing = "mypicList";
		}
  }

  async savePhotos(){
		if(this.mypicObj){		
			let response = await this.mygalleries.save(this.mypicObj);
			if(response.error){
				alert("There was an error creating the Mypic");
			} else {
				    var mypicId = response._id;
                        if(this.filesToUpload && this.filesToUpload.length){
                            await this.mygalleries.uploadFile(this.filesToUpload, this.user._id, mypicId);
                            this.filesToUpload = [];
                        }
          
			}
			this.showing = "photoList";
		}
  }
  
async showPhotos(mypic){
  this.selectedgallery =  mypic._id;
 await this.mygalleries.getPhotos(mypic._id)
this.showing = "photoList";
  }

  changeFiles(){
        this.filesToUpload = new Array(); 
        this.filesToUpload.push(this.files[0]);
    }
    
    removeFile(index){
        this.filesToUpload.splice(index,1);
    }
    
  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}

}
