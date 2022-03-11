import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-card-catalog-pdf',
  templateUrl: './card-catalog-pdf.component.html',
  styleUrls: ['./card-catalog-pdf.component.scss']
})
export class CardCatalogPdfComponent implements OnInit, OnDestroy {

  @Input() data: any;
  private subscription: Subscription = new Subscription();
  blob: Blob;

  constructor(private content: ContentService, private utils: UtilsService) { }

  ngOnInit(): void {
  }

  public generatePdf(pdf:any) {
    this.subscription = this.content.generatepdf(pdf.id).subscribe((data:any) =>{
      this.utils.download(data, 'pdf' , `${pdf.description}.pdf`);
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
