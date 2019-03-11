import { Pipe, PipeTransform } from '@angular/core';
import { labels } from '../models/labels';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(labels:labels[] , searchValue: any): any {
    console.log(labels, searchValue);
    if (!searchValue) {
      return labels;
    }
    else {
      return labels.filter(({labelName}) => {
        return labelName.includes(searchValue);
      });
    }
  }

}
