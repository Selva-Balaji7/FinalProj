import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-user-registration',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  selectedFile : File|null = null;
  imageUrl: string|null = null;

  constructor(private http : DbservicesService){}

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    if(!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile,this.selectedFile.name);

    this.http.postRecord("Upload",formData).subscribe(
      (response:any) => {
        console.log('upload successfull', response)
        this.imageUrl = response.imageUrl;
      },
      (error) => {
        console.error('upload failed', error);
      }
    );
  }

}
