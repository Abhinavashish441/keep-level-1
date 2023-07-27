import { Component } from '@angular/core';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-header></app-header>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            Take a note
          </mat-panel-title>
        </mat-expansion-panel-header>
        <form (submit)="onAddNote()">
          <div class="container">
          <div class="box">
          <mat-form-field>
            <input matInput placeholder="Title" name="title" [(ngModel)]="newNote.title" required>
          </mat-form-field></div>
          <div class="box">
          <mat-form-field>
            <textarea matInput placeholder="Text" name="text" [(ngModel)]="newNote.text" required></textarea>
          </mat-form-field>
          </div>
          </div>
          <br>
          <button class="button" mat-button type="submit">Done</button>
        </form>
        <p *ngIf="errMessage" class="error-message">{{ errMessage }}</p>
      </mat-expansion-panel>

      <div class="notes-container">
        <mat-card *ngFor="let note of notes">
          <mat-card-title>{{ note.title }}</mat-card-title>
          <mat-card-content>{{ note.text }}</mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newNote: Note = new Note('', '');
  notes: Note[] = [];
  errMessage: string = '';

  constructor(private notesService: NotesService) {
    this.fetchNotes();
  }

  onAddNote() {
    this.notesService.addNote(this.newNote).subscribe(
      (response) => {
        this.notes.push(response);
        this.newNote = new Note('', ''); 
        this.errMessage = '';
      },
      (error) => {
        this.errMessage = 'Failed to add the note. Please try again.';
      }
    );
  }

  fetchNotes() {
    this.notesService.getNotes().subscribe(
      (response) => {
        this.notes = response;
      },
      (error) => {
        this.errMessage = 'Failed to fetch notes from the server.';
      }
    );
  }
}
