export class LocationHref {
  static redirect(url: string) {
    window.location.href = url.toString();
  }
}
