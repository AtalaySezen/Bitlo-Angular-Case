import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const formattedPhone = value.replace(/\D/g, '');

    return `+${formattedPhone.slice(0, 2)} ${formattedPhone.slice(2, 5)} ${formattedPhone.slice(5, 8)} ${formattedPhone.slice(8, 10)} ${formattedPhone.slice(10)}`;
  }
}

