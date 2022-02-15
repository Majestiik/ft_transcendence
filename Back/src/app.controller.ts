import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
	var ret: Array <any>;
	axios.get('http://localhost:3003/clients').then((res: any) => {ret = res.data; console.log(ret)}).then(() => {return ret});
	//return ret;
	//return this.appService.getHello();
  }
}
