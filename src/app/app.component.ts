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
    const maliciousInput = `<script>alert('XSS Attack!')</script>`;
    
    // ❌ Vulnerable DOM injection
    const doc = document as Document;
    doc.body.innerHTML = maliciousInput;   // ✅ XSS vulnerability
  }

 
}
