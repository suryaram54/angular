import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTestDialogOpenerModule} from '@angular/material/dialog/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  // const MAT_DIALOG_DATA: InjectionToken<any>;
    seasons: string[] = ['Brand new', 'secondHand', 'Refurbished'];
    actionBtn:string='save';
   productForm !: FormGroup;
  constructor(private formBuilder :FormBuilder, private api:ApiService,
    // @inject(MAT_DIALOG_DATA)() public editdata :Dialog,
    public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
   

  ngOnInit(): void {

   this.productForm =this.formBuilder.group({
      productName : ['',Validators.required],
      category   :['',Validators.required],
      freshness :['',Validators.required],
      price  :['',Validators.required],
      comment :['',Validators.required],
      date  :['',Validators.required]

   })

 if(this.data){
 this.actionBtn='update';
this.productForm.controls['productName'].setValue(this.data.productName);
this.productForm.controls['category'].setValue(this.data.category);
this.productForm.controls['freshness'].setValue(this.data.freshness);
this.productForm.controls['price'].setValue(this.data.price);
this.productForm.controls['comment'].setValue(this.data.comment);
this.productForm.controls['date'].setValue(this.data.date);
 }
  }

  addProduct(){
  if(!this.data){
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
  }else{
      this.updateProduct()
  } 
    
}
updateProduct(){
this.api.putProduct(this.productForm.value,this.data.id)
.subscribe({
  next:(res)=>{
    alert('product update succssfully');
    this.productForm.reset();
    this.dialogRef.close('update')
  },
  error:()=>{
alert("error while update he data")
  }
})

}





}