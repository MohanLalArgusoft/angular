import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,FormBuilder ,Validators} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm : FormGroup;

  validationMessages = {
    'fullName':{
      'required': 'Full Name is required.',
      'minlength' : 'Full Name must be greater than 2.',
      'maxlength' : 'Full Name must be less than 15.'
    },
    'email':{
      'required': 'Email is required.'
    },
    'skillName':{
      'required': 'Skill Name is required.'
    },
    'experienceInYears':{
      'required': 'Experience is required.'
    },
    'proficiency':{
      'required': 'Proficiency is required.'
    }
  };


  formErrors = {
    'fullName':'',
    'email':'',
    'skillName':'',
    'experienceInYears':'',
    'proficiency':''
  }

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    //using formbuilders
    this.employeeForm = this.fb.group({
      fullName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      email:['',Validators.required],
      skills:this.fb.group({
        skillName : ['',Validators.required],
        experienceInYears : ['',Validators.required],
        proficiency : ['beginner',Validators.required]
      })
    });

    //monitoring form using subscribe
    this.employeeForm.valueChanges.subscribe((value:any)=>{
      console.log(JSON.stringify(value));
      //this.logValidationErrors(this.employeeForm);
    });

    
    // this.employeeForm = new FormGroup({         //this is basic for creating form
    //   fullName: new FormControl(),
    //   email:new FormControl(),
    //   skills:new FormGroup({
    //     skillName : new FormControl(),
    //     experienceInYears : new FormControl(),
    //     proficiency : new FormControl()
    //   })
    // });
  }

  onSubmit(){
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
    
  }

  logKeyValuePairs(group:FormGroup) : void{
    //console.log(Object.keys(group.controls));
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logKeyValuePairs(abstractControl);
      }else{
        console.log('Key = '+key+' Value = '+abstractControl.value );
        // abstractControl.disable();
      }
    });
  }

  logValidationErrors(group:FormGroup) : void{
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }else{
        this.formErrors[key]=' ';
        if(abstractControl && !abstractControl.valid){
          const messages = this.validationMessages[key];
          for(const errorKey in abstractControl.errors){
            if(errorKey){
              this.formErrors[key] += messages[errorKey]+ ' ';
            }
          }
        }
      }
    });
  }



  onLoadDataClick(){
    // this.employeeForm.setValue({    //patchValue to update required fields
    //   fullName:'Monil',
    //   email:'monildhing@gmail.com',
    //   skills:{
    //     skillName:'C',
    //     experienceInYears:4,
    //     proficiency:'beginner'
    //   }
    // });
    // this.logKeyValuePairs(this.employeeForm);        //To display all key and value
    this.logValidationErrors(this.employeeForm);        //To display validation errors
    console.log(this.formErrors);
  }
}
