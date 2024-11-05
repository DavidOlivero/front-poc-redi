import { Component, OnInit, AfterViewInit } from '@angular/core';
import { QuestDataService } from "../../services/quest-data.service";
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-form2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form2.component.html',
  styleUrl: './form2.component.css'
})
export class Form2Component implements OnInit, AfterViewInit {
  maritalStatus: any
  municipalitys: any
  form2!: FormGroup

  constructor(private _api: QuestDataService) {
    this.form2 = new FormGroup({
      marital_status: new FormControl('Casado'),
      municipality: new FormControl('Sincelejo')
    })
  }

  ngOnInit(): void {
    this._api.getData().subscribe({
      next: (responce) => {
        this.maritalStatus = responce['marital_status']
        this.municipalitys = responce['municipality']
      }
    })

    this.form2.valueChanges.subscribe({
      next: (values) => {
        console.log(JSON.stringify(values))
        this._api.saveData('form2', 'form2', JSON.stringify(values)).subscribe({
          next: () => {
            console.log('Forumulario 2 actualizado con éxito')
          }
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this._api.getForm("form2", 'form2').subscribe({
      next: (value) => {
        if (value !== null) {
          this.form2.get('marital_status')?.setValue(value['marital_status'])
          this.form2.get('municipality')?.setValue(value['municipality'])
        }
      }
    })
  }

  onSubmit(value: any, formName: string) {
    this._api.saveData('form2', formName, JSON.stringify(value)).subscribe({
      next: () => {
        console.log('Formulario cacheado correctamente')
      }
    })
    
    this._api.getForm('form1', 'form1').subscribe({
      next: (value) => {
        this._api.saveDataInDb('form1', value).subscribe({
          next: () => {
          }
        })
      }
    })
    
    this._api.getForm('form2', 'form2').subscribe({
      next: (value) => {
        this._api.saveDataInDb('form2', value).subscribe({
          next: () => {
          }
        })
      }
    })
  }
}
