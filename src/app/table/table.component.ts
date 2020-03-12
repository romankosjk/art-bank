import { Component, OnInit } from '@angular/core';
import {DbService} from '../servies/db.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  personData: any = [];
  thName: any = [];
  constructor(private Person: DbService) {
  }

  ngOnInit(): void {
    this.getPersons();
  }
  getPersons() {
    this.Person.getPerson().subscribe(person => {
      this.thName = person.data.metaData;
      person.data.rows.forEach(rows => {
        let tempPerson: any = {};
        person.data.metaData.forEach((name, index) => {
          tempPerson = Object.assign(tempPerson, {[name.name]: rows[index]});
        });
        this.personData.push(tempPerson);
      });
    });
    console.log(this.personData);
  }
}
