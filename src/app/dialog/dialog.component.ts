import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


    seasons: string[] = ['Brand new', 'secondHand', 'Refurbished'];
 
   productForm !: FormGroup;
  constructor(private formBuilder :FormBuilder, private api:ApiService,private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

   this.productForm =this.formBuilder.group({
      productName : ['',Validators.required],
      category   :['',Validators.required],
      freshness :['',Validators.required],
      price  :['',Validators.required],
      comment :['',Validators.required],
      date  :['',Validators.required]

   })


  }

  addProduct(){
   
    if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
    next:(res)=>{
      alert("product added successfully")
      this.productForm.reset();
      this.dialogRef.close('save');
    },
    error:()=>{
      alert("error while addingb thev product")
    }


    })


    }
}
}