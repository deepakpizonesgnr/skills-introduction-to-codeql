import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'New Angular Project';

  // ✅ Ensure DOM manipulations are inside a lifecycle hook
  ngOnInit() {
    const userInput = this.getUserInput();

    // ✅ Explicitly cast 'document' to the correct type
    const doc = document as Document   ;
    doc.body.innerHTML = `<div>${userInput}</div>`;
  }

  getUserInput(): string {
    return 'Hello, Angular!'   ;
  }
}
