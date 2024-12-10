import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
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

  formularioValido(): boolean {
    return this.nombre !== '' && this.apellido !== '' && this.correo !== '' && this.contrasena !== '' && this.validarCorreo();
  }

  validarCorreo(): boolean {
    const regex = /^(.*)(@alumno\.cl|@docente\.cl)$/;
    return regex.test(this.correo);
  }

  async registrarUsuario() {
    if (this.formularioValido()) {
      // Guardamos los datos del usuario en el almacenamiento
      const usuario = {
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contrasena: this.contrasena,
      };

      await this.storage.set('usuario', usuario); // Guardamos los datos en el almacenamiento
      console.log('Usuario registrado:', usuario);

      // Redirigimos a la página de inicio de sesión o página principal
      this.navCtrl.navigateRoot('');
    } else {
      console.log('Formulario inválido o correo no válido');
    }
  }
}
