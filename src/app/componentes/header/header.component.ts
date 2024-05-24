import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../Servicios/token.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  //title = 'thePlaces';
  isLogged = false;
  email: string = "";
 
 

  constructor(private tokenService: TokenService) {
    
   }
 
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
   

    }
  }

  public logout() {
    this.tokenService.logout();
  }

  getRole(): string {
    return this.tokenService.getRole(); // Asumiendo que getRole devuelve un string representando el rol del usuario
  }
}
