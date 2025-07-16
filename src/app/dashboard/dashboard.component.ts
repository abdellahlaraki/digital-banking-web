import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ChartDataService } from '../services/chart-data.service'; // <-- Vérifiez ce chemin !

// Correction ici : utilisez BaseChartDirective au lieu de NgChartsModule
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // Correction ici : BaseChartDirective dans les imports
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // ... (votre code de graphique existant) ...

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    },
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) { label += ': '; }
            if (context.parsed.y !== null) { label += context.parsed.y + ' comptes'; }
            return label;
          }
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Nombre de comptes bancaires', backgroundColor: '#42A5F5' }
    ]
  };

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.getCustomerAccountData();
  }

  getCustomerAccountData(): void {
    this.chartDataService.getCustomerAccountCounts().subscribe({
      next: (data: { [key: string]: number }) => {
        console.log(data);// Typage explicite
        const customerNames = Object.keys(data);
        const accountCounts: number[] = Object.values(data); // Typage explicite

        this.barChartData.labels = customerNames;
        this.barChartData.datasets[0].data = accountCounts;

        this.barChartData = { ...this.barChartData };
      },
      error: (err: any) => { // Typage explicite
        console.error('Erreur lors de la récupération des données des comptes clients', err);
      }
    });
  }
}
