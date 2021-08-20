import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-novelty-chat',
  templateUrl: './novelty-chat.component.html',
  styleUrls: ['./novelty-chat.component.scss'],
})
export class NoveltyChatComponent implements OnInit, AfterViewInit {
  @Input() novelty?: any;
  @Input() listNotes: Array<any> = [];
  @Output() updateNovelty? = new EventEmitter<any>();
  dateForm: FormGroup = new FormGroup({});
  @ViewChildren('messages') notes: QueryList<any>;
  @ViewChild('content', { static: true }) content: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.notes.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  };

  initForm(): void {
    this.dateForm = this.fb.group({
      responsenovelty: ['', [Validators.maxLength(500), Validators.required]],
    });
  }

  sendNote(): void {
    const data = {
      idnovelty: this.novelty.id,
      description: this.dateForm.value.responsenovelty,
      statusnovelty: this.novelty.statusnovelty,
      typenewnovelty: false,
    };
    this.updateNovelty.emit(data);
    this.dateForm.reset();
  }
}
