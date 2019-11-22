import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomevComponent } from './homev/homev.component';
import { VisualizeRoutingModule } from './visualize-routing.module';
import { VProfessorComponent } from './vprofessor/vprofessor.component';
import { VAlunoComponent } from './valuno/valuno.component';
import { VUnidadeComponent } from './vunidade/vunidade.component';
import { VGrupoComponent } from './vgrupo/vgrupo.component';
import { VApresentacaoComponent } from './vapresentacao/vapresentacao.component';
import { VSalaComponent } from './vsala/vsala.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomevComponent, VProfessorComponent, VAlunoComponent, VUnidadeComponent, VGrupoComponent, VApresentacaoComponent, VSalaComponent],
  imports: [
    CommonModule, 
    FormsModule,
    VisualizeRoutingModule
  ]
})
export class VisualizeModule { }
