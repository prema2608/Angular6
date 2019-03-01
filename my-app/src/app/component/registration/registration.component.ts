import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    REGEX_USERNAME = "[a-zA-Z ]*$";
    REGEX_EMAILID = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    REGEX_MOBILENUMBER = "^[0-9]{10}$";
    REGEX_PASSWORD = "^[a-zA-Z0-9]{3,8}$";
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private userservice: UserService,
        private router: Router,
    ) { }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required, Validators.pattern[this.REGEX_USERNAME]],
            mobileNumber: ['', Validators.required, Validators.pattern[this.REGEX_MOBILENUMBER]],
            emailId: ['', Validators.required, Validators.pattern[this.REGEX_EMAILID]],
            password: ['', Validators.required, Validators.pattern[this.REGEX_PASSWORD]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit(user) {
        this.submitted = true;
        this.userservice.register(user)
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }



        console.log(user);
        this.userservice.register(user).subscribe(response => {
            console.log("Registered");
        },

            (error) => {
                console.log("invalid");

            });
    }
}