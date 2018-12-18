<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Cultivares" searchable navigation_type="menu" >
    </toolbar>

    <div class="space-end">
      <template v-for="cultura in culturas">

        <!--HEADER CULTURA-->
        <div :key="cultura.id" class="row q-pa-md q-mt-sm bg-blue-grey-1">

          <div class="col-6 q-title">
            {{cultura.nome}}
          </div>

          <div class="col-6" align="end">
            <q-btn icon="edit" @click.native="editCultura(cultura)" flat round color="primary"/>
            <q-btn round flat dense icon="more_vert">
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay @click.native="addFotoCultura(cultura.id)">
                    <q-item-main label="Atualizar Foto"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="archiveCultura(cultura.id)" v-if="!cultura.deleted_at">
                    <q-item-main label="Arquivar"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="restoreCultura(cultura.id)" v-if="cultura.deleted_at">
                    <q-item-main label="Ativar"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="deleteCultura(cultura.id)">
                    <q-item-main label="Excluir"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </div>
        </div>

        <div class="row gutter-xs justify-center" v-for="marca in cultura.marcas">

          <!--MARCA-->
          <div class="q-ma-sm col-xs-9 col-sm-6 col-md-4 col-lg-3">
            <q-card>
              <q-card-title>
                {{marca.nome}}
                <div slot="right">
                  <q-btn round flat dense icon="more_vert">
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay @click.native="addFotoMarca(marca.id)">
                          <q-item-main label="Atualizar Foto"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="editMarca(marca)">
                          <q-item-main label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="archiveMarca(marca.id)" v-if="!marca.deleted_at">
                          <q-item-main label="Arquivar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="restoreMarca(marca.id)" v-if="marca.deleted_at">
                          <q-item-main label="Ativar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteMarca(marca.id)">
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </div>
              </q-card-title>
              <q-card-separator/>
              <q-card-media>
                <img src="assets/images/no-image.png"/>
              </q-card-media>
            </q-card>
          </div>

          <!--CULTIVARES-->
          <div class="q-mt-sm col-xs-12 col-sm-12 col-md-7 col-lg-8">
            <div class="row gutter-y-xs" v-for="cultivar in marca.cultivares">
              <div class="col-12">
                <q-list separator>
                  <q-item class="q-py-xs">
                    <q-item-main>
                      <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">{{cultivar.nome}}</div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                          <q-chip color="primary" small v-if="cultivar.is_convencional">Convencional</q-chip>
                          <q-chip class="q-ma-xs" color="primary" small v-if="cultivar.is_rr">RR</q-chip>
                          <q-chip class="q-ma-xs" color="primary" small v-if="cultivar.is_inox">Inox</q-chip>
                          <q-chip class="q-ma-xs" color="primary" small v-if="cultivar.is_intacta">Intacta</q-chip>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-12 col-lg-5">Ciclo {{cultivar.ciclo}} {{cultivar.ciclo_dias}} dias</div>
                      </div>
                    </q-item-main>
                    <q-item-side>
                      <q-btn round flat dense icon="more_vert">
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="editCultivar(cultura.id, cultivar)">
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="editTypeCultivar(cultura.id, cultivar)">
                              <q-item-main label="Alterar tipo"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="archiveCultivar(cultura.id, cultivar.id)">
                              <q-item-main label="Arquivar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="restoreCultivar(cultura.id, cultivar.id)">
                              <q-item-main label="Ativar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteCultivar(cultura.id, cultivar.id)">
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </q-item-side>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>

        </div>
      </template>
    </div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" v-if="culturas.length <= 0">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="primary" >
        <q-btn v-close-overlay rounded color="primary" @click="newCultura" label="cultura"/>
        <q-btn rounded color="primary" @click="newMarca" label="marca"/>
        <q-btn rounded color="primary" @click="newCultivar" label="cultivar"/>
      </q-fab>
    </q-page-sticky>

    <!--MODAIS-->
    <template>
      <!--MODAL NEW CULTURA-->
      <q-modal v-model="modalNewCultura" minimized no-backdrop-dismiss>
        <div class="row q-ma-lg">
          <div class="col-12">

            <!--NOME-->
            <div class="row justify-around">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <custom-input-text label="Nome" :model="cultura.nome" />
              </div>
              <div class="col-sm-6 col-lg-6"/>
            </div>

            <div class="row gutter-xs justify-around">

              <!--ESTIMATIVA-->
              <div class="col-xs-4 col-sm-6 col-md-2 col-lg-3">
                <custom-input-text type="number" label="Estimativa" :model="cultura.defaultEstimativa" />
              </div>

              <!--SELECT UNIDADE MEDIDA-->
              <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
                <q-field :error="cultura.defaultUnidadeMedidaId.errorMessage != null">
                  <q-select
                    @input="clearErrorMessage"
                    float-label="Unidade Medida"
                    :options="unidadeMedidaOptions"
                    v-model="cultura.defaultUnidadeMedidaId.value"
                  />
                </q-field>
                <div class="q-field-bottom row">
                  <div class="text-negative" v-if="cultura.defaultUnidadeMedidaId.errorMessage != null" >
                    {{cultura.defaultUnidadeMedidaId.errorMessage}}
                  </div>
                </div>
              </div>

              <div class="col-xs-4 col-sm-1 col-md-1 col-lg-1 self-center">
                Por
              </div>

              <!--SELECT UNIDADE AREA-->
              <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
                <q-field :error="cultura.defaultUnidadeAreaId.errorMessage != null">
                  <q-select
                    @input="clearErrorMessage"
                    float-label="Unidade área"
                    :options="unidadeAreaOptions"
                    v-model="cultura.defaultUnidadeAreaId.value"
                  />
                </q-field>
                <div class="q-field-bottom row">
                  <div class="text-negative" v-if="cultura.defaultUnidadeAreaId.errorMessage != null" >
                    {{cultura.defaultUnidadeAreaId.errorMessage}}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-12" align="end">
            <q-btn @click.native="closeModalNewCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
            <q-btn @click.native="saveCultura" color="primary" label="Salvar"/>
          </div>
        </div>
      </q-modal>

      <!--MODAL EDIT CULTURA-->
      <q-modal v-model="modalEditCultura" minimized no-backdrop-dismiss >
        <div class="row q-ma-lg">
          <div class="col-12">

            <!--NOME-->
            <div class="row justify-around">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <custom-input-text label="Nome" :model="cultura.nome" />
              </div>
              <div class="col-sm-6 col-lg-6"/>
            </div>

            <div class="row gutter-xs justify-around">

              <!--ESTIMATIVA-->
              <div class="col-xs-4 col-sm-6 col-md-2 col-lg-3">
                <custom-input-text type="number" label="Estimativa" :model="cultura.defaultEstimativa" />
              </div>

              <!--SELECT UNIDADE MEDIDA-->
              <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
                <q-field :error="cultura.defaultUnidadeMedidaId.errorMessage != null">
                  <q-select
                    @input="clearErrorMessage"
                    float-label="Unidade Medida"
                    :options="unidadeMedidaOptions"
                    v-model="cultura.defaultUnidadeMedidaId.value"
                  />
                </q-field>
                <div class="q-field-bottom row">
                  <div class="text-negative" v-if="cultura.defaultUnidadeMedidaId.errorMessage != null" >
                    {{cultura.defaultUnidadeMedidaId.errorMessage}}
                  </div>
                </div>
              </div>

              <div class="col-xs-4 col-sm-1 col-md-1 col-lg-1 self-center">
                Por
              </div>

              <!--SELECT UNIDADE AREA-->
              <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
                <q-field :error="cultura.defaultUnidadeAreaId.errorMessage != null">
                  <q-select
                    @input="clearErrorMessage"
                    float-label="Unidade área"
                    :options="unidadeAreaOptions"
                    v-model="cultura.defaultUnidadeAreaId.value"
                  />
                </q-field>
                <div class="q-field-bottom row">
                  <div class="text-negative" v-if="cultura.defaultUnidadeAreaId.errorMessage != null" >
                    {{cultura.defaultUnidadeAreaId.errorMessage}}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-12" align="end">
            <q-btn @click.native="closeModalEditCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
            <q-btn @click.native="updateCultura" color="primary" label="Salvar"/>
          </div>
        </div>
      </q-modal>

      <!--MODAL ADD FOTO CULTURA-->
      <q-modal v-model="modalAddFotoCulura" maximized no-backdrop-dismiss>
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL ADD FOTO
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalAddFotoCultura" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL NEW MARCA-->
      <q-modal v-model="modalNewMarca" minimized no-backdrop-dismiss>
        <div class="row justify-center q-ma-lg">
          <div class="col-12">
            <custom-input-text label="Nome" :model="marca.nome" />
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-12" align="end">
            <q-btn @click.native="closeModalNewMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
            <q-btn @click.native="saveMarca" color="primary" label="Salvar"/>
          </div>
        </div>
      </q-modal>

      <!--MODAL EDIT MARCA-->
      <q-modal v-model="modalEditMarca" minimized no-backdrop-dismiss>
        <div class="row justify-center q-ma-lg">
          <div class="col-12">
            <custom-input-text label="Nome" :model="marca.nome" />
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-12" align="end">
            <q-btn @click.native="closeModalEditMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
            <q-btn @click.native="updateMarca" color="primary" label="Salvar"/>
          </div>
        </div>
      </q-modal>

      <!--MODAL ADD FOTO MARCA-->
      <q-modal v-model="modalAddFotoMarca" maximized no-backdrop-dismiss>
        <div class="row justify-center q-pt-lg">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center">
            MODAL ADD FOTO MARCA
          </div>
        </div>
        <div class="row justify-center content-center" style="min-height: 80vh"></div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click.native="closeModalAddFotoMarca" color="primary" label="Cancelar" class="q-mr-xs"/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL NEW CULTIVAR-->
      <q-modal v-model="modalNewCultivar" maximized>

        <q-stepper ref="stepperNewCultivar" contractable color="positive" v-model="currentStep" class="no-shadow" >

          <!--PASSO 1 ESCOLHER CULTURA-->
          <q-step default title="Culturas" name="cultura">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">
                <q-card @click.native="selectCultura(cultura.id)">
                  <q-card-media overlay-position="full">
                    <img src="assets/images/no-image.png"/>
                    <q-card-title slot="overlay" align="end" v-if="cultura.id === cultivar.culturaId">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-separator/>
                  <q-card-title class="text-center">
                    {{cultura.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>
          </q-step>

          <!--PASSO 2 ESCOLHER A MARCA -->
          <q-step title="Marca" name="marca">
            <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="marca in marcas" :key="marca.id">
                <q-card @click.native="selectMarca(marca.id)">
                  <q-card-media overlay-position="full">
                    <img src="assets/images/no-image.png"/>
                    <q-card-title slot="overlay" align="end" v-if="marca.id === cultivar.marcaId">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-separator/>
                  <q-card-title class="text-center">
                    {{marca.nome}}
                  </q-card-title>
                </q-card>
              </div>
            </div>
          </q-step>

          <!--PASSO 3 ESCOLHER O TIPO CULTIVAR-->
          <q-step title="Tipo" name="tipo">
            <div class="row justify-center items-center" style="min-height: 80vh">
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <q-list no-border>

                  <!--CONVENCIONAL-->
                  <q-item>
                    <q-item-main>Convencional</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        v-model="cultivar.isConvencional.value"
                        toggle-color="primary"
                        @input="choiseTypeValidation"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                  <!--RR-->
                  <q-item>
                    <q-item-main :class="(cultivar.isConvencional.value)?'text-faded':'text-black'">RR</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        toggle-color="primary"
                        :disable="cultivar.isConvencional.value"
                        v-model="cultivar.isRoundupReady.value"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                  <!--INOX-->
                  <q-item>
                    <q-item-main :class="(cultivar.isConvencional.value)?'text-faded':'text-black'">Inox</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        toggle-color="primary"
                        :disable="cultivar.isConvencional.value"
                        v-model="cultivar.isInox.value"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                  <!--INTACTA-->
                  <q-item>
                    <q-item-main :class="(cultivar.isConvencional.value)?'text-faded':'text-black'">Intacta</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        toggle-color="primary"
                        :disable="cultivar.isConvencional.value"
                        v-model="cultivar.isIntacta.value"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                </q-list>
              </div>
            </div>
          </q-step>

          <!--PASSO 4 ADICIONAR INFORMACOEA-->
          <q-step title="Informações" name="informacoes">
            <div class="row justify-center items-center" style="min-height: 80vh">
              <div class="col-12">

                <div class="row justify-center">
                  <div class="col-xs-10 col-sm-6 col-md-4 col-lg-3">
                    <custom-input-text label="Nome" :model="cultivar.nome" />
                  </div>
                </div>

                <div class="row justify-center gutter-sm">
                  <div class="col-xs-5 col-sm-3 col-md-3 col-lg-2">
                    <q-field :error="cultivar.ciclo.errorMessage != null">
                      <q-select
                        float-label="Ciclo"
                        @input="clearErrorMessage"
                        v-model="cultivar.ciclo.value"
                        :options="cultivarCicloOptions"
                      />
                    </q-field>
                    <div class="q-field-bottom row">
                      <div class="text-negative" v-if="cultivar.ciclo.errorMessage != null" >
                        {{cultivar.ciclo.errorMessage}}
                      </div>
                    </div>
                  </div>

                  <div class="col-xs-5 col-sm-3 col-md-1 col-lg-1">
                    <custom-input-text label="Dias" :model="cultivar.cicloDias" type="number"/>
                  </div>
                </div>

                <div class="row justify-center">
                  <div class="col-xs-10 col-sm-6 col-md-4 col-lg-3">
                    <q-input v-model="cultivar.observacoes.value" type="textarea" float-label="Observações"/>
                  </div>
                </div>

              </div>
            </div>
          </q-step>

        </q-stepper>

        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn label="cancelar" color="primary" @click="closeModalAddCultivar" class="q-mr-sm"/>
          <q-btn label="próximo" color="primary" @click="goToNextStepNewCultivar" :disable="!isNextButtomEnabled()" v-if="currentStep !== 'informacoes' "/>
          <q-btn label="salvar" color="primary" @click="saveCultivar" v-if="currentStep == 'informacoes' "/>
        </q-page-sticky>
      </q-modal>

      <!--MODAL EDIT CULTIVAR-->
      <q-modal v-model="modalEditCultivar" minimized no-backdrop-dismiss>
        <div class="row justify-center q-ma-lg">
          <div class="col-12">

            <div class="row justify-center">
              <div class="col-12">
                <custom-input-text label="Nome" :model="cultivar.nome" />
              </div>
            </div>

            <div class="row justify-center gutter-sm">
              <div class="col-6">
                <q-field :error="cultivar.ciclo.errorMessage != null">
                  <q-select
                    float-label="Ciclo"
                    @input="clearErrorMessage"
                    v-model="cultivar.ciclo.value"
                    :options="cultivarCicloOptions"
                  />
                </q-field>
                <div class="q-field-bottom row">
                  <div class="text-negative" v-if="cultivar.ciclo.errorMessage != null" >
                    {{cultivar.ciclo.errorMessage}}
                  </div>
                </div>
              </div>

              <div class="col-6">
                <custom-input-text label="Dias" :model="cultivar.cicloDias" type="number"/>
              </div>
            </div>

            <div class="row justify-center">
              <div class="col-12">
                <q-input v-model="cultivar.observacoes.value" type="textarea" float-label="Observações"/>
              </div>
            </div>

          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-12" align="end">
            <q-btn class="q-mr-sm" label="cancelar" color="primary" @click="closeModalEditCultivar"/>
            <q-btn label="salvar" color="primary" @click="updateInfoCultivar"/>
          </div>
        </div>
      </q-modal>

      <!--MODAL CHANGE TYPE CULTIVAR-->
      <q-modal v-model="modalChangeTypeCultivar" minimized no-backdrop-dismiss>
        <div class="row q-ma-lg">
          <div class="col-12">

            <div class="row">
              <div class="col-12">
                <q-list no-border>

                  <!--CONVENCIONAL-->
                  <q-item>
                    <q-item-main>Convencional</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        v-model="cultivar.isConvencional.value"
                        toggle-color="primary"
                        @input="choiseTypeValidation"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                  <!--RR-->
                  <q-item>
                    <q-item-main :class="(cultivar.isConvencional.value)?'text-faded':'text-black'">RR</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        toggle-color="primary"
                        :disable="cultivar.isConvencional.value"
                        v-model="cultivar.isRoundupReady.value"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                  <!--INOX-->
                  <q-item>
                    <q-item-main :class="(cultivar.isConvencional.value)?'text-faded':'text-black'">Inox</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        toggle-color="primary"
                        :disable="cultivar.isConvencional.value"
                        v-model="cultivar.isInox.value"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                  <!--INTACTA-->
                  <q-item>
                    <q-item-main :class="(cultivar.isConvencional.value)?'text-faded':'text-black'">Intacta</q-item-main>
                    <q-item-side>
                      <q-btn-toggle
                        toggle-color="primary"
                        :disable="cultivar.isConvencional.value"
                        v-model="cultivar.isIntacta.value"
                        :options="[ {label: 'Sim', value: true}, {label: 'Não', value: false} ]"
                      />
                    </q-item-side>
                  </q-item>

                </q-list>
              </div>
            </div>

          </div>
        </div>
        <div class="row q-ma-md">
          <div class="col-12" align="end">
            <q-btn class="q-mr-sm" label="cancelar" color="primary" @click="closeModalchangeTypeCultivar"/>
            <q-btn label="Salvar" color="primary" @click="updateTypeCultivar"/>
          </div>
        </div>
      </q-modal>
    </template>

  </custom-page>
</template>
<script>
    import toolbar from 'components/Toolbar.vue'
    import customPage from 'components/CustomPage.vue'
    import customInputText from 'components/CustomInputText.vue'
    import Cultura from 'assets/js/model/cultura/Cultura'
    import Marca from 'assets/js/model/cultura/Marca'
    import Cultivar from 'assets/js/model/cultura/Cultivar'
    import culturaService from 'assets/js/service/cultura/CulturaService'
    export default {
      name: "cultura-list-view",
      components: {
        toolbar,
        customPage,
        customInputText
      },
      data () {
        return {
          currentStep: 'cultura',
          modalNewCultura: false,
          modalEditCultura: false,
          modalAddFotoCulura: false,
          modalNewMarca: false,
          modalEditMarca: false,
          modalAddFotoMarca: false,
          modalNewCultivar: false,
          modalEditCultivar: false,
          modalChangeTypeCultivar: false,
          culturas: [],
          cultura: new Cultura(),
          selectedCultura: null,
          marcas: [],
          marca: new Marca(),
          selectedMarca: null,
          cultivar: new Cultivar(),
          selectedCultivar: null,
          unidadeMedidaOptions: [],
          cultivarCicloOptions: [
            {
              label: 'Superprecoce',
              value: 'Superprecoce'
            },
            {
              label: 'Precoce',
              value: 'Precoce'
            },
            {
              label: 'Médio-Precoce',
              value: 'Médio-Precoce'
            },
            {
              label: 'Médio',
              value: 'Médio'
            },
            {
              label: 'Médio-Tardio',
              value: 'Médio-Tardio'
            },
            {
              label: 'Tardio',
              value: 'Tardio'
            }
          ],
          unidadeAreaOptions: [],
          //isConvencional: true,
        }
      },
      methods: {
        // CRUD CULTURA
        listCulturas: function() {
          culturaService.listCulturas().then(response => {
            this.culturas = response.data;
          })
        },
        newCultura: function(){
          this.modalNewCultura = true;
        },
        closeModalNewCultura: function(){
          this.cultura = new Cultura();
          this.modalNewCultura = false;
        },
        saveCultura: function(){
          if(!this.cultura.isValid()){
            return;
          }
          culturaService.saveCultura(this.cultura.getValues()).then(response => {
            if(response.status === 201) {
              this.$q.notify({type: 'positive', message: 'Cultura criada com sucesso'});
              this.listCulturas();
              this.closeModalNewCultura();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        editCultura: function(cultura){
          this.selectedCultura = cultura.id;
          this.fillFormCultura(cultura);
          this.modalEditCultura = true;
        },
        fillFormCultura: function(cultura){
          this.cultura.nome.value = cultura.nome;
          this.cultura.defaultEstimativa.value = cultura.default_estimativa;
          this.cultura.defaultUnidadeMedidaId.value = cultura.default_unidade_medida_id;
          this.cultura.defaultUnidadeAreaId.value = cultura.default_unidade_area_id;
        },
        addFotoCultura: function(id){
          this.modalAddFotoCulura = true;
        },
        closeModalAddFotoCultura: function(){
          this.modalAddFotoCulura = false;
        },
        updateCultura: function() {
          if (!this.cultura.isValid()) {
            return;
          }
          culturaService.updateCultura(this.selectedCultura, this.cultura.getValues()).then(response => {
            if (response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
              this.listCulturas();
              this.closeModalEditCultura();
            }
          })
        },
        closeModalEditCultura: function(){
          this.modalEditCultura = false;
          this.selectedCultura = null;
          this.cultura = new Cultura();
        },
        archiveCultura: function(id){
          culturaService.archiveCultura(id).then(response => {
            this.listCulturas()
          })
        },
        restoreCultura: function(id){
          culturaService.restoreCultura(id).then(response => {
            this.listCulturas()
          })
        },
        deleteCultura: function(id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esta cultura?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            culturaService.deleteCultura(id).then(response => {
              this.listCulturas()
            })
          }).catch(()=>{});

        },

        // CRUD MARCA
        listMarcas: function(){
          culturaService.listMarcas().then(response => {
            this.marcas = response.data;
          })

        },
        newMarca: function(){
          this.modalNewMarca = true;
        },
        closeModalNewMarca: function(){
          this.modalNewMarca = false;
        },
        saveMarca: function(){
          if(!this.marca.isValid()){
            return;
          }
          culturaService.saveMarca(this.marca.getValues()).then(response => {
            if(response.status === 201) {
              this.$q.notify({type: 'positive', message: 'Marca criada com sucesso'});
              this.listCulturas();
              this.closeModalNewMarca();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        addFotoMarca: function(){
          this.modalAddFotoMarca = true;
        },
        closeModalAddFotoMarca: function(){
          this.modalAddFotoMarca = false;
        },
        editMarca: function(marca){
          this.selectedMarca = marca.id;
          this.fillFormMarca(marca);
          this.modalEditMarca = true;
        },
        fillFormMarca: function(marca){
          this.marca.nome.value = marca.nome;
        },
        closeModalEditMarca: function(){
          this.marca = new Marca();
          this.modalEditMarca = false;
        },
        updateMarca: function(){
          if(!this.marca.isValid()){
            return;
          }
          culturaService.updateMarca(this.selectedMarca, this.marca.getValues()).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Cultura atualizada com sucesso!'});
              this.listCulturas();
              this.closeModalEditCultura();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        archiveMarca: function(id){
          culturaService.archiveMarca(id).then(response => {
            this.listCulturas()
          })
        },
        restoreMarca: function(id){
          culturaService.restoreMarca(id).then(response => {
            this.listCulturas()
          })
        },
        deleteMarca: function(id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esta marca?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            culturaService.deleteMarca(id).then(response => {
              this.listCulturas()
            })
          }).catch(()=>{});

        },

        // CRUD CULTIVAR
        listCultivar: function(){
          let fake = 'soja';
          this.culturas.push({
            name: fake
          })

        },
        newCultivar: function(){
          this.modalNewCultivar = true;
          this.listMarcas();
        },
        selectCultura: function(id){
          this.cultivar.culturaId = id;
          this.goToNextStepNewCultivar();
        },
        selectMarca: function(id){
          this.cultivar.marcaId = id;
          this.goToNextStepNewCultivar();
        },
        closeModalAddCultivar: function(){
          this.isConvencional = false;
          this.currentStep = 'cultura';
          this.cultivar = new Cultivar();
          this.modalNewCultivar = false;
        },
        saveCultivar: function(){
          if(!this.cultivar.isValid()){
            return;
          }
          culturaService.saveCultivar(this.cultivar.culturaId, this.cultivar.getValues()).then(response => {
            if(response.status === 201) {
              this.$q.notify({type: 'positive', message: 'Cultivar criado com sucesso'});
              this.listCulturas();
              this.closeModalAddCultivar();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        editCultivar: function(culturaId, cultivar){
          this.selectedCultura = culturaId;
          this.selectedCultivar = cultivar.id;
          this.modalEditCultivar = true;
          this.fillFormEditCultivar(cultivar);
        },
        fillFormEditCultivar: function(cultivar){
          this.cultivar.culturaId = cultivar.cultura_id;
          this.cultivar.marcaId = cultivar.marca_id;
          this.cultivar.nome.value = cultivar.nome;
          this.cultivar.ciclo.value = cultivar.ciclo;
          this.cultivar.cicloDias.value = cultivar.ciclo_dias;
          this.cultivar.observacoes.value = cultivar.observacoes;
        },
        updateInfoCultivar: function(){
          if(!this.cultivar.isValid()){
            return;
          }
          culturaService.updateCultivar(this.selectedCultivar, this.cultivar.getValues()).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Cultivar atualizado com sucesso!'});
              this.listCulturas();
              this.closeModalEditCultivar();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        closeModalEditCultivar: function(){
          this.modalEditCultivar = false;
          this.selectedCultura = null;
          this.selectedCultivar = null;
          this.cultivar = new Cultivar();
        },
        editTypeCultivar: function(culturaId, cultivar){
          this.selectedCultura = culturaId;
          this.selectedCultivar = cultivar.id;
          this.modalChangeTypeCultivar = true;
          this.fillFormEditTypeCultivar(cultivar);
        },
        fillFormEditTypeCultivar: function(cultivar){
          this.cultivar.isConvencional.value = cultivar.is_convencional;
          this.cultivar.isRoundupReady.value = cultivar.is_rr;
          this.cultivar.isInox.value = cultivar.is_inox;
          this.cultivar.isIntacta.value = cultivar.is_intacta;
        },
        updateTypeCultivar: function(){
          if(!this.cultivar.isConvencional.value){
            if(!this.cultivar.isRoundupReady.value && !this.cultivar.isInox.value && !this.cultivar.isIntacta.value){
              this.$q.dialog({
                noBackdropDismiss: true,
                title: 'Oops!',
                message: 'Escolha ao menos um tipo',
                ok: 'OK'
              });
              return;
            }
          }
          culturaService.updateTypeCultivar(this.selectedCultivar, this.cultivar.getValues()).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Cultivar atualizado com sucesso!'});
              this.listCulturas();
              this.closeModalchangeTypeCultivar();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          });
        },
        closeModalchangeTypeCultivar: function(){
          this.selectedCultura = null;
          this.selectedCultivar = null;
          this.cultivar = new Cultivar();
          this.modalChangeTypeCultivar = false;
        },
        archiveCultivar: function(cultura_id, id){
          culturaService.archiveCultivar(cultura_id, id).then(response => {
            this.listCulturas()
          })
        },
        restoreCultivar: function(cultura_id, id){
          culturaService.restoreCultivar(cultura_id, id).then(response => {
            this.listCulturas()
          })
        },
        deleteCultivar: function(cultura_id, id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esta cultivar?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            culturaService.deleteCultivar(cultura_id, id).then(response => {
              this.listCulturas()
            })
          }).catch(()=>{});

        },

        // OUTROS
        selectUnidadeMedida: function(){
          culturaService.selectUnidadeMedida().then(response => {
            this.unidadeMedidaOptions = response;
          })
        },
        selectUnidadeArea: function(){
          culturaService.selectUnidadeArea().then(response => {
            this.unidadeAreaOptions = response;
          })
        },
        clearErrorMessage: function(){
          this.cultivar.ciclo.errorMessage = null;
          this.cultura.defaultUnidadeMedidaId.errorMessage = null;
          this.cultura.defaultUnidadeAreaId.errorMessage = null;
        },
        choiseTypeValidation: function(value){
          if(value === true){
            //this.cultivar.isConvencional.value = true;
            this.cultivar.isRoundupReady.value = false;
            this.cultivar.isInox.value = false;
            this.cultivar.isIntacta.value = false;
          }
        },
        isNextButtomEnabled: function(){
          if(this.currentStep === 'tipo'){
            return true
          }
          return false
        },
        goToNextStepNewCultivar(){
          if(this.currentStep === 'tipo'){
            if(!this.cultivar.isConvencional.value){
              if(!this.cultivar.isRoundupReady.value && !this.cultivar.isInox.value && !this.cultivar.isIntacta.value){
                this.$q.dialog({
                  noBackdropDismiss: true,
                  title: 'Oops!',
                  message: 'Escolha ao menos um tipo',
                  ok: 'OK'
                });
                return;
              }
            }
          }
          this.$refs.stepperNewCultivar.next();
        },
      },
      mounted () {
        this.listCulturas();
        this.selectUnidadeMedida();
        this.selectUnidadeArea();
        // this.$root.$on('refreshSafraList', () => {
        //   this.listSafras();
        // });
      },
    }
  </script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
</style>
