import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

export interface LoginData {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  icon = faSignInAlt;
  error: boolean;
  errorMessage: string;
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    this.error = false;
    this.errorMessage = null;

    const { email, password } = this.form.value;

    this.api
      .login({ email, password })
      .subscribe(
        ({ statusCode, message }) => {
          switch (statusCode) {
            case 200:
              this.router.navigateByUrl('/home');
              break;
            case 201:
              this.error = true;
              this.errorMessage = `Usuario y/o contraseña no válido, por favor recuerda que tiene 4
              intentos para ingresar al sistema, luego de esto su usuario será bloqueado. ${message}`;
              break;
            case 202:
              this.error = true;
              this.errorMessage = `Usuario y/o contraseña no válido, has excedido el número de intentos permitidos. ${message}`;
              break;
            case 203:
              this.openErrorModal();
              break;
          }
        },
        (err) => {
          if (err.error.statusCode === 404) {
            this.error = true;
            this.errorMessage = `El usuario ingresado no existe, volver a intentar.`;
          }
        }
      )
      .add(() => (this.loading = false));
  }

  openErrorModal() {
    this.modalService.open(LoginModalContent);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Oops... hubo un problema</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        Su usuario se encuentra bloqueado, favor contacte al administrador del
        sistema, o al teléfono +00 0000 0000 para que sean restablecidos los
        accesos al sistema.
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Cerrar
      </button>
    </div>
  `,
})
export class LoginModalContent {
  constructor(public activeModal: NgbActiveModal) {}
}
