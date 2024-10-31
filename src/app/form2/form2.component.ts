import { Component, OnInit } from '@angular/core';
import { QuestDataService } from "../../services/quest-data.service";
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-form2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form2.component.html',
  styleUrl: './form2.component.css'
})
export class Form2Component implements OnInit {
  maritalStatus: any
  municipalitys: any
  form2!: FormGroup

  constructor(private _api: QuestDataService) {
    this.form2 = new FormGroup({
      maritalStatus: new FormControl('Casado'),
      municipalitys: new FormControl('Sincelejo')
    })
  }

  ngOnInit(): void {
    this._api.getData().subscribe({
      next: (responce) => {
        this.maritalStatus = responce['marital_status']
        this.municipalitys = responce['municipality']

        console.log(this.maritalStatus, this.municipalitys)
      }
    })
  }

  onSubmit(value: any, formName: string) {
    this._api.saveData('form2', formName, JSON.stringify(value)).subscribe({
      next: () => {
        console.log('Formulario cacheado correctamente')
      }
    })
  }
}
