import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(users: User[], searchValue: any): any {
    console.log(users, searchValue);
    if (!searchValue) {
      return null;
    }
    else {
      return users.filter(({ emailId }) => {
        return emailId.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
}

}
