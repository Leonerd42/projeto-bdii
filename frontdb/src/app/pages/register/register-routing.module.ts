import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRegisterComponent } from './home-register/home-register.component';
import { RProfessorComponent } from './rprofessor/rprofessor.component';
import { RalunoComponent } from './raluno/raluno.component';
import { RUnidadeComponent } from './runidade/runidade.component';
import { RgrupoComponent } from './rgrupo/rgrupo.component';
import { RapresentacaoComponent } from './rapresentacao/rapresentacao.component';
import { RsalaComponent } from './rsala/rsala.component';

const routes: Routes = [
{
    path: 'register', 
    component: HomeRegisterComponent, 
    children: [
        {
            path: '', 
            component: RUnidadeComponent
        },
        {
            path: 'professor', 
            component: RProfessorComponent
        },
        {
            path: 'aluno', 
            component: RalunoComponent
        },
        {
            path: 'unidade', 
            component: RUnidadeComponent
        },
        {
            path: 'grupo', 
            component: RgrupoComponent
        },
        {
            path: 'apresentacao', 
            component: RapresentacaoComponent
        },
        {
            path: 'sala', 
            component: RsalaComponent
        },

    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class RegisterRoutingModule { }