import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './simulator.html',
  styleUrls: ['./simulator.css'],
})
export class SimulatorComponent {
  precio!: number;
  bono!: number;
  tasa = 0.09;
  plazo = 10;

  cuota?: number;
  monto?: number;
  historial: any[] = [];
  n?: number;

  calcularSimulacion() {
    if (!this.precio || !this.bono) {
      alert('Por favor complete todos los campos correctamente.');
      return;
    }

    const monto = this.precio - this.bono;
    const n = this.plazo * 12;
    const tasaMensual = this.tasa / 12;
    const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));

    this.monto = monto;
    this.cuota = cuota;
    this.n = n;

    this.generarGrafico(monto, tasaMensual, cuota);
    this.generarTabla(monto, tasaMensual, n, cuota);
  }

  generarGrafico(monto: number, tasaMensual: number, cuota: number) {
    const canvas = document.getElementById('graficoIntereses') as HTMLCanvasElement;
    if (!canvas) return;

    const intereses: number[] = [];
    const amortizaciones: number[] = [];
    let saldo = monto;

    for (let i = 0; i < 12; i++) {
      const interes = saldo * tasaMensual;
      const amort = cuota - interes;
      saldo -= amort;
      intereses.push(Number(interes.toFixed(2)));
      amortizaciones.push(Number(amort.toFixed(2)));
    }

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        datasets: [
          { label: 'Interés (S/)', data: intereses },
          { label: 'Amortización (S/)', data: amortizaciones }
        ]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

  generarTabla(monto: number, tasaMensual: number, n: number, cuota: number) {
    this.historial = [];
    let saldo = monto;
    for (let i = 1; i <= n; i++) {
      const interes = saldo * tasaMensual;
      const amort = cuota - interes;
      const saldoFinal = saldo - amort;
      this.historial.push({
        i,
        saldo: saldo.toFixed(2),
        interes: interes.toFixed(2),
        amort: amort.toFixed(2),
        cuota: cuota.toFixed(2),
        saldoFinal: saldoFinal.toFixed(2),
      });
      saldo = saldoFinal;
    }
  }
}
