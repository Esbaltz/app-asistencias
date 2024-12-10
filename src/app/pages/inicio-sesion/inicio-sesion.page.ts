import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  correo: string = '';
  contrasena: string = '';

  constructor(private storage: Storage, private navCtrl: NavController) {
    this.initStorage();
   }

  ngOnInit() {
  }

  async initStorage() {
    await this.storage.create();
  }

  async verificarCredenciales() {
    // Verificar si el correo y la contraseña son correctos
    const usuario = await this.storage.get('usuario');

    if (usuario && usuario.correo === this.correo && usuario.contrasena === this.contrasena) {
      // Si las credenciales son correctas, redirigimos al usuario a la página del login
      this.navCtrl.navigateRoot('/tabs');
    } else {
      // Si las credenciales no son correctas, mostramos un mensaje de error
      console.log('Credenciales incorrectas');
    }
  }

  iniciarSesion() {
    if (this.correo && this.contrasena) {
      this.verificarCredenciales();
    } else {
      console.log('Por favor ingrese todos los campos');
    }
  }

}
