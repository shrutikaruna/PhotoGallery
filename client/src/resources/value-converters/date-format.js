import moment from 'moment';
export class DateFormatValueConverter {
toView(value, format = 'Do MMM YYYY') {
if(value === undefined || value === null){
	return;
    		}
    
    		return moment(value).format(format);
	}
}