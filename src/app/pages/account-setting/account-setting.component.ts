import { Component, OnInit } from '@angular/core';
import { SetingsService } from 'src/app/services/setings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  constructor( private settingService: SetingsService ) {}

  ngOnInit(): void {
    this.settingService.check();
  }

  changeThem( tema: string ){

    this.settingService.changeTheme(tema);

  }


}
