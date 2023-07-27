import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: Note) {
    return this.http.post<Note>(this.apiUrl, note);
  }
}
  