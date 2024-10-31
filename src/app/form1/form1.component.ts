import { Component, OnInit } from '@angular/core';
import { QuestDataService } from "../../services/quest-data.service";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form1.component.html',
  styleUrl: './form1.component.css'
})
export class Form1Component implements OnInit {
  public dropDowns: any
  public deathTypeLabels: any
  public identificationLabels: any
  public form1!: FormGroup
  
  constructor(private _api: QuestDataService) {
    this.form1 = new FormGroup({
      'death_type': new FormControl('Muerte natural'),
      'identification_type': new FormControl('Cédula')
    })
  }

  ngOnInit(): void {
    this._api.getData().subscribe({
      next: (value) => {
        this.dropDowns = value
        this.deathTypeLabels = this.dropDowns['death_type']
        this.identificationLabels = this.dropDowns['identification_type']
      },
      error: (err) => {
        console.log('No se ha podigo establecer la conección con la api: ' + err)
      }
    })

  }

  onSubmit(value: any, formName: string) {
    this._api.saveData('form1', formName, JSON.stringify(value)).subscribe({
      next: () => {
        console.log('Formulario cacheado correctamente')
      }
    })
  }
}
