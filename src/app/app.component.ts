import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  userInput = `<script>alert('XSS Attack!')</script>`;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit() {
    // ✅ 1. XSS Vulnerabilities
    this.testXSS();

    // ✅ 2. SQL Injection
    this.testSQLInjection();

    // ✅ 3. CSRF Attack Simulation
    this.testCSRF();

    // ✅ 4. Hardcoded Secrets
    this.testHardcodedSecrets();

    // ✅ 5. Open Redirect Vulnerability
    this.testOpenRedirect();

    // ✅ 6. Insecure Deserialization
    this.testInsecureDeserialization();

    // ✅ 7. Weak Cryptography
    this.testWeakCryptography();
  }

  // ✅ 1. XSS (Cross-Site Scripting) Vulnerabilities
  testXSS() {
    console.log('Testing XSS vulnerabilities...');

    // ❌ DOM Manipulation
    document.body.innerHTML = this.userInput;  // XSS vulnerability

    // ❌ Bypassing Angular Sanitizer
    this.sanitizer.bypassSecurityTrustHtml(this.userInput);

    // ❌ InnerHTML with Unsafe Data
    const div = document.createElement('div');
    div.innerHTML = this.userInput;  // XSS vulnerable
    document.body.appendChild(div);
  }

  // ✅ 2. SQL Injection Vulnerabilities
  testSQLInjection() {
    console.log('Testing SQL Injection vulnerabilities...');

    // ❌ SQL query with unsanitized user input
    const userId = "'; DROP TABLE users; --";
    const query = `SELECT * FROM users WHERE id = '${userId}'`;  // SQL Injection

    // ❌ Http request with SQL query (vulnerable)
    this.http.get(`/api/data?query=${query}`).subscribe(response => {
      console.log('SQL response:', response);
    });
  }

  // ✅ 3. CSRF Vulnerability
  testCSRF() {
    console.log('Testing CSRF vulnerabilities...');

    // ❌ CSRF vulnerable POST request (no CSRF token)
    this.http.post('/api/transfer', { amount: 1000 })
      .subscribe(response => console.log('CSRF:', response));
  }

  // ✅ 4. Hardcoded Secrets
  testHardcodedSecrets() {
    console.log('Testing Hardcoded Secrets...');

    // ❌ Hardcoded API Key
    const apiKey = '12345-ABCDE';  // Hardcoded API key
    console.log('API Key:', apiKey);

    // ❌ Hardcoded Password
    const dbPassword = 'SuperSecret123';  // Hardcoded password
    console.log('DB Password:', dbPassword);
  }

  // ✅ 5. Open Redirect Vulnerability
  testOpenRedirect() {
    console.log('Testing Open Redirect vulnerabilities...');

    const url = 'https://malicious-site.com';
    window.location.href = url;  // Open redirect vulnerability
  }

  // ✅ 6. Insecure Deserialization
  testInsecureDeserialization() {
    console.log('Testing Insecure Deserialization...');

    const serializedData = JSON.stringify({ isAdmin: true });
    const deserializedData = JSON.parse(serializedData);  // Insecure deserialization
    console.log('Deserialized Data:', deserializedData);
  }

  // ✅ 7. Weak Cryptography
  testWeakCryptography() {
    console.log('Testing Weak Cryptography...');

    // ❌ Use of Weak Encryption (DES)
    const key = crypto.randomBytes(8);  // 8 bytes for DES (insecure)
    const iv = crypto.randomBytes(8);
    const cipher = crypto.createCipheriv('des-ecb', key, iv);
    const encrypted = cipher.update('Sensitive Data', 'utf8', 'hex') + cipher.final('hex');
    console.log('Weak Encryption:', encrypted);

    // ❌ Use of MD5 for password hashing (insecure)
    const md5Hash = crypto.createHash('md5').update('password').digest('hex');
    console.log('MD5 Hash:', md5Hash);
  }
}
