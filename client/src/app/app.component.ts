import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  public products: any = [];

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  private getProducts(): void {
    const url = 'http://localhost:4200/api';
    this.http.get(url).subscribe((resp: any) => {
      this.products = resp.result;
    });
  }
}
