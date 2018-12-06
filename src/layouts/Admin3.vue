<template>


  <q-layout view="lhr LpR fff">

    <q-layout-header class="ap-layout-header">
      <q-toolbar color="primary">
        <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-toolbar-title>

        </q-toolbar-title>
        <q-btn flat round dense  @click="rightDrawerOpen = !rightDrawerOpen">
          <img src="~/assets/timeline-text-outline.svg"/>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer side="left" v-model="leftDrawerOpen" class="layout-drawer">
      <div class="navigation-header">
        <img src="~assets/person-profile-image.jpg" class="profile-image shadow-1" style="opacity: 0"/>
        <span class="profile-name">Danilo</span>
        <span class="profile-email">danilo@oliveira.com</span>
        <q-btn flat round dense class="settings_icon">
          <q-icon name="settings" />

          <q-popover>
            <q-list link class="scroll" style="min-width: 200px">
              <!--<q-item @click.native="">
                <q-item-main label="Minha conta" />
              </q-item>-->
              <q-item @click.native="logout()">
                <q-item-main label="Sair" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>

      </div>
      <q-list no-border link inset-delimiter>
        <q-item @click.native="$router.push('/admin')">
          <q-item-side icon="dashboard" />
          <q-item-main label="Dashboard" />
        </q-item>
        <q-item @click.native="$router.push({name:'users'})">
          <q-item-side icon="group" />
          <q-item-main label="Usuários" />
        </q-item>
        <q-item @click.native="$router.push({name:'pessoas'})">
          <q-item-side icon="group" />
          <q-item-main label="Pessoas" />
        </q-item>
        <q-item @click.native="$router.push({name:'areas'})">
          <q-item-side icon="place" />
          <q-item-main label="Áreas" />
        </q-item>
        <!--<q-item @click.native="$router.push({name:'notas-fiscais'})">
          <q-item-side icon="receipt" />
          <q-item-main label="Notas Fiscais" />
        </q-item>-->
        <q-item @click.native="$router.push({name:'safras'})">
          <q-item-side><i class="fab fa-pagelines q-headline"></i></q-item-side>
          <q-item-main label="Safras" />
        </q-item>
      </q-list>
    </q-layout-drawer>


    <q-page-container class="ap-page-container">
      <div class="q-card-outter">
        <q-card color="white" text-color="black" class="ap-page-container-card">
          <q-card-main style="height: 100%; padding-bottom: 68px;">
            <router-view style="width: 100%" />
          </q-card-main>
        </q-card>
      </div>
    </q-page-container>


    <q-layout-drawer side="right" v-model="rightDrawerOpen" class="ap-timeline-drawer">
        <q-timeline  color="deep-orange" style="padding: 100px 24px;">
          <q-timeline-entry heading><h5>Timeline (3 media breakpoints)</h5></q-timeline-entry>

          <q-timeline-entry v-for="i of 10"
            title="Event Title"
            subtitle="February 22, 1986"
            side="right">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </q-timeline-entry>
        </q-timeline>
    </q-layout-drawer>

  </q-layout>
</template>

<script>

    export default {
        name: "Admin3",
      data () {
        return {
          leftDrawerOpen: false,
          rightDrawerOpen: false
        }
      },
      methods:{
      }
    }
</script>

<style >
  html{
    overflow: hidden;
  }

  .q-layout{
    /*background-color: #fcfcfc;*/
    background: url("~/assets/image (1).jpg");
  }

  .ap-layout-header{
    height: 128px;
    background-color: #005f5f;
    /*position: relative;*/
  }

  .ap-layout-header .q-toolbar{
    height: 64px;
    padding: 0 24px;
  }

  .ap-layout-header .q-toolbar .q-icon{
    font-size: 24px;
  }

  .ap-layout-header .q-toolbar>button{
    margin-left: -6px;
    margin-right: -6px;
    margin-top: 6px;
    margin-bottom: 6px;
    width: 36px;
    height: 36px;
  }

  .ap-page-container{
    padding-top: 0px !important;
    /*position: relative;
    z-index: 2000;*/

    bottom: 0px;
    top: 64px;
    position: absolute;
    left: 0px;
    z-index: 2000;
    right: 0px;
  }

  /*.ap-page-container >.q-card{*/
  .ap-page-container .q-card-outter{
    /*margin-top: -64px;*/
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;;
    height: 100%;
  }

  .ap-page-container >.q-card{
    height: 100%;
  }

  .ap-page-container-card{
    margin: 0 20px;
    height: 100%;
    overflow: hidden;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .ap-page-container-card >.q-card-main{
    padding: 0;
  }

  .navigation-header{
    height: 150px;
    background-color: teal;
    padding: 20px;
  }
  .navigation-header .profile-image{
    border-radius: 50%;
    border: 2px solid white;
    width: 65px;
    height: 65px;
    display: block;
    margin-bottom: 10px;
  }

  .navigation-header .profile-name{
    color: white;
    font-size: 16px;
    font-weight: 400;
    display: block;
    margin-bottom: 6px;
  }

  .navigation-header .profile-email{
    color: white;
    font-size: 14px;
    font-weight: 300;
    display: block;
  }

  .navigation-header .settings_icon{
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    color: white;
  }

  .q-layout-drawer{
    background: #fcfcfc;
    z-index: 3000;
  }
  .layout-drawer .q-list-link .q-item:hover{
    background: rgba(217, 217, 217, 0.3);
  }

  .ap-timeline-drawer .q-layout-drawer{
    box-shadow: inset 0 0px 5px -1px rgba(0,0,0,0.2), inset 0 0 5px 0px rgba(0,0,0,0.14), inset 2px 0px 8px rgba(0,0,0,0.12);
    background: #fcfcfc;
  }


  .ap-sticky-area{
    position: sticky;
    bottom: 0;
    text-align: right;
    width: inherit;
    padding: 18px;
  }

  .ap-sticky-area > button{
    position: static;
  }


</style>
