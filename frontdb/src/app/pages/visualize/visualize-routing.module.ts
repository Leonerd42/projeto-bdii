import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomevComponent } from './homev/homev.component';
import { VProfessorComponent } from './vprofessor/vprofessor.component';
import { VAlunoComponent } from './valuno/valuno.component';
import { VGrupoComponent } from './vgrupo/vgrupo.component';
import { VUnidadeComponent } from './vunidade/vunidade.component';
import { VSalaComponent } from './vsala/vsala.component';
import { VApresentacaoComponent } from './vapresentacao/vapresentacao.component';

const routes: Routes = [
{
    path: 'visualize', 
    component: HomevComponent, 
    children: [
        {
            path: 'professor', 
            component: VProfessorComponent
        },
        {
            path: 'aluno', 
            component: VAlunoComponent
        },
        {
            path: 'grupo', 
            component: VGrupoComponent
        }, 
        {
            path: 'unidade', 
            component: VUnidadeComponent
        }, 
        {
            path: 'sala', 
            component: VSalaComponent
        }, 
        {
            path: 'apresentacao', 
            component: VApresentacaoComponent
        }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class VisualizeRoutingModule { }