import { Component } from "@angular/core";
import { User } from "./shared/user/user";
import { Page } from "ui/page";
import { UserService } from "./shared/user/user.service";
import { Observable } from "rxjs/Rx";


@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css","pages/login/login.css"]
})

export class AppComponent {
    user:User;
    isLoggin=true;

    constructor(private page:Page,private userService:UserService) {
        page.backgroundImage = "res://bg_inner";
        this.user=new User();
    };

    submit() {
		if(!this.user.email || !this.user.password ){
			alert("All fields required!")
		}else{
	        if(this.isLoggin){
	            this.fetch();
	        }else{
	            this.signUp()
	        }
		}
    };
    fetch(){
		console.log('login function gets call')

		this.userService.getData()
		.subscribe(
			(res) => console.dir(res.json()),
			(err) => console.log("Unfortunately we were unable to get data.")
		)

    };
    signUp(){
		this.userService.register(this.user)
		.subscribe(
			(res) => {
                console.log(res.text());
                alert(res.text());
                this.toggle();
            },
			(err) => {
                console.log("Unfortunately we were unable to create your account.");
                alert(err.text());
            }
        )
    };

    toggle() {
        this.isLoggin=!this.isLoggin;
    };

    

	ngOnInit(){
		
	}
}
