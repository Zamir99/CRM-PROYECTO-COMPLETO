import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { contactsData } from '../../../../../static-data/contacts';
import { UntypedFormBuilder } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';
import { UsuarioServiceRol } from '../../../../../@vex/services/usuario.service.rol';

export let contactIdCounter = 50;

@Component({
  selector: 'vex-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {

  form = this.fb.group({
    nombre: null, 
    apellido: null,
    password: null,
    telefono: null,
    email: null,
    rol: null,
    birthday: null,
    notes: null
  });

  contact: Contact;

  get isEdit(): boolean {
    return !!this.contactId;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private contactId: Contact['id'],
              private dialogRef: MatDialogRef<ContactsEditComponent>,
              private fb: UntypedFormBuilder,
              private usuarioService: UsuarioServiceRol) { } 

  ngOnInit() {
    if (this.contactId) {
      this.contact = contactsData.find(c => c.id === this.contactId);
      this.form.patchValue(this.contact);
    }
  }

  toggleStar() {
    if (this.contact) {
      this.contact.starred = !this.contact.starred;
    }
  }

  save() {
    const form = this.form.value;

    const usuario = {
      nombre: form.nombre,
      apellido: form.apellido,
      password: form.password,
      telefono: form.telefono,
      email: form.email,
      rol: form.rol,
      birthday: form.birthday,
      notes: form.notes
    };

    this.usuarioService.crearUsuario(usuario).subscribe(
      (response) => {
        console.log('Usuario creado exitosamente', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }
}
