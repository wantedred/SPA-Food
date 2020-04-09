import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { NourishmentService } from 'src/app/nutrition/nourishments/nourishment.service';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { Nutrients } from 'src/app/nutrition/nutrients/nutrients';
import { NourishmentType, nourishmentTypeNames, NourishmentTypeName } from 'src/app/nutrition/util/nourishment-type';

@Component({
  selector: 'app-create-nourishment',
  templateUrl: './create-nourishment.component.html',
  styleUrls: ['./create-nourishment.component.css']
})
export class CreateNourishmentComponent implements OnInit {

  infoMessage:string = null;

  nourishmentTypeNames: NourishmentTypeName[] = nourishmentTypeNames;
  createForm:FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private nourishmentService: NourishmentService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group(
      {
        nameControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        brandControl: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
        photoControl: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
        typeControl: new FormControl('', Validators.required),
        nutrientsControl: new FormControl(''),
      }
    );
  }

  onSubmit(): void {
    console.log("Posting nourishment");

    if (this.createForm.invalid) {
      console.log("Invalid form");
      return;
    }
    let name:string = this.createForm.controls['nameControl'].value;
    let brand:string = this.createForm.controls['brandControl'].value;
    let photo:string = this.createForm.controls['photoControl'].value;
    let type:NourishmentType = this.createForm.controls['typeControl'].value;
    let nutrients:Nutrients = new Nutrients(); //this.createForm.controls['nutrientsControl'].value;

    let nourishment: Nourishment = new Nourishment();
    nourishment.name = name;
    nourishment.brand = brand ? brand : "";
    nourishment.image = photo ? photo : "";
    nourishment.nourishmentType = type;
    nourishment.nutrients = nutrients;

    this.infoMessage = "Submitting...";

    console.warn("Posting nourishment => " + nourishment);

    this.nourishmentService.addNourishment(nourishment)
      .subscribe(resp => resp.success ? this.infoMessage = "Successfully submitted" : this.infoMessage = resp.message);

    this.createForm.reset();
    
    Object.keys(this.createForm.controls).forEach(key => {
      this.createForm.get(key).setErrors(null);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
