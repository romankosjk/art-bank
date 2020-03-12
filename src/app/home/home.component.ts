import {Component, OnInit} from '@angular/core';
import {DbService} from '../servies/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  personData: any = [];
  thName: any = [];
  enableEdit = false;
  enableEditIndex = null;
  newPerson = {};


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
    console.log('getPersons', this.personData);
  }

  enableEditMethod(i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }
  saveSegment() {
    this.enableEdit = false;
    this.enableEditIndex = null;

    // TODO REST API $personData
    // ......
    console.log('saveSegment', this.personData);
  }
  deleteMethod(row) {
    this.personData.splice(row, 1);

    // TODO REST API $personData
    // ......
    console.log('deleteMethod', this.personData);
  }
  addMethod() {
    console.log('addMethodRow', this.newPerson);
    this.personData.push(this.newPerson);
    this.newPerson = {};

    // TODO REST API $personData
    // ......
    console.log('addMethod', this.personData);
  }
}
