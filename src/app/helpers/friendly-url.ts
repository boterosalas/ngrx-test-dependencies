export class FiendlyUrl {
    static removeAccentsAndSpaces(text: string) {
      return text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replaceAll(' ','-') : '';
    }
}