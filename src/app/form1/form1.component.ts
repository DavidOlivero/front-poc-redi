import { Component, OnInit, AfterViewInit } from '@angular/core';
import { QuestDataService } from "../../services/quest-data.service";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form1.component.html',
  styleUrl: './form1.component.css'
})
export class Form1Component implements OnInit, AfterViewInit {
  public dropDowns: any
  public deathTypeLabels: any
  public identificationLabels: any
  public form1!: FormGroup
  
  constructor(private _api: QuestDataService) {
    this.form1 = new FormGroup({
      'death_type': new FormControl(),
      'identification_type': new FormControl('Cédula')
    })
  }

  ngOnInit(): void {
    this._api.getData().subscribe({
      next: (value) => {
        this.dropDowns = value
        this.deathTypeLabels = this.dropDowns['death_type']
        this.identificationLabels = this.dropDowns['identification_type']
        this.form1.get('death_type')?.setValue(this.deathTypeLabels[0])
        this.form1.get('identification_type')?.setValue(this.identificationLabels[0])
      },
      error: (err) => {
        console.log('No se ha podigo establecer la conección con la api: ' + err)
      }
    })

    this.form1.valueChanges.subscribe({
      next: (values) => {
        this._api.saveData('form1', 'form1', JSON.stringify(values)).subscribe({
          next: () => {
            console.log('Forumulario 1 actualizado con éxito')
          }
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this._api.getForm("form1", 'form1').subscribe({
      next: (value) => {
        if (value !== null) {
          this.form1.get('death_type')?.setValue(value['death_type'])
          this.form1.get('identification_type')?.setValue(value['identification_type'])
        }
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
