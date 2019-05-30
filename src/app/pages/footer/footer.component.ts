import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {GlobalDataService} from '../../services/global-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private http:HttpService, private globalData: GlobalDataService) { }



  ngOnInit() {}

}
