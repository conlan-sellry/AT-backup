<template>
  <div class="page-home home">

    <div class="header-logo small-20  align-center">
      <c-logo />
    </div>
    <div class="container" v-if="product && isValidProduct(product)">

        <div class="row v-center">
            <div class="std-content intro">
                <div class='name small-10 align-center'
                    v-if="product.name"
                >
                    <h1>{{ product.name }}</h1>
                </div>

                <div class="description align-center small-20"
                    v-if="product.description">
                    <h2>{{ product.description }}</h2>
                </div>
            </div>
            <div class="std-content-image--full align-center small-20"
                v-if="product.images.material">
                <img :src="this.getSbkImage(product.images.material, '500x500')" />
            </div>
        </div>


        <div class="row" v-if="coordsReady">
            <div
                class="map align-center small-20"
                v-if="2===2"
            >
                <c-gmap :locations="getValidLocations()" />
                <c-map-key :locations="locations"></c-map-key>
            </div>

            <div class="provenance align-center small-20"
                    v-if="product.provenanceJourney.length > 0">
                <h2>Provenance Journey</h2>
                <p
                    v-for="(step, idx) in product.provenanceJourney"
                    :key="idx"
                    class="step"
                    v-if="step.trim().length > 0"
                >
                {{ step }}
                </p>
            </div>
        </div>

        <div class="row">
            <div class="std-content-image--right">
                <img class="small-20"
                    :src="this.getSbkImage(product.images.animalWelfare, '500x500')"
                    v-if="product.images.animalWelfare"
                >
            </div>
            <div class="std-content align-center small-20"
                    v-if="product.animalWelfare">
                <h2>Animal Welfare</h2>
                <p>
                {{ product.animalWelfare }}
                </p>
            </div>
        </div>

        <div class="row">
            <div class="std-content-image--left"
                v-if="product.whoMadeYourClothes">
                <img
                :src="this.getSbkImage(product.images.whoMadeYourClothes, '500x500')"
                v-if="product.images.whoMadeYourClothes"
                >
            </div>

            <div class="std-content align-center"
            v-if="product.whoMadeYourClothes">

                <h2>Who Made Your Clothes</h2>
                <p>
                {{ product.whoMadeYourClothes }}
                </p>

            </div>
        </div>


        <div class="row">
            <div class="std-content-image--right">
                <img
                :src="this.getSbkImage(product.images.environmentalWelfare, '500x500')"
                v-if="product.images.environmentalWelfare"
                >
            </div>

            <div class="std-content align-center small-20"
                v-if="product.environmentalWelfare.length > 0">

                <h2>Environmental Welfare</h2>
                <p>
                {{ product.environmentalWelfare }}
                </p>
            </div>
        </div>

        <div class="row">
            <div class="std-content align-center small-20"
                    v-if="product.whyItMatters.length > 0">
                <h2 class="indent">Why it Matters</h2>
                <ol class="stats">
                    <li
                            v-for="(item, idx) in product.whyItMatters"
                            :key="idx"
                            class="stat"
                    >
                        <p>{{ item }}</p>
                    </li>
                </ol>
            </div>
        </div>
        <div class="row">
            <div class="comment-form align-center small-20">
                <h2>Comment</h2>
                <p>We would love to hear from you</p>

                <c-comments-form />
            </div>
        </div>
        <div class="row">
            <div class="share align-center small-20">
              <h2>Share</h2>
              Feel free to share

                <ul class="c-SocialLinks">
                    <li>
                        <a :href="socialShare.twitter" target="_blank" class="c-SocialLink">
                            <img src="//a.storyblok.com/f/56947/x/162628eca0/twitter.svg" alt="Find us on Twitter">
                        </a>
                    </li>
                    <li>
                        <a :href="socialShare.facebook" target="_blank" class="c-SocialLink">
                            <img src="//a.storyblok.com/f/56947/x/44690efad4/facebook.svg" alt="Find us on Facebook">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
            <div class="footer-logo small-20  align-center">
                <a href="http://google.com" target="_blank" class="c-SocialLink">
                    <c-logo />
                </a>
            </div>

            <div class="footer-copyright small-20  align-center">
              &copy; Copyright Another Tomorrow 2019
            </div>

          </div>

          <div class="error" v-else-if="error">
            <!-- <error />-->
            error
          </div>

    </div>
</template>
<script>
import Error from '../Error';
import axios from 'axios';
import Parallax from "vue-parallaxy";

import CCommentsForm from '../../components/FormCommentsHtml/FormCommentsHtml.vue';
import CMapKey from '../../components/MapKey/MapKey.vue';
import CGmap from '../../components/GoogleMap/GoogleMap.vue';
import CLogo from '../../components/AppLogo.vue';
import getSbkImage from '../../mixins/images.js';

import { ValidationProvider } from 'vee-validate';

export default {
  name: 'Home',
    mixins:[
        getSbkImage
    ],
  components:{
    Error,
    CLogo,
    CCommentsForm,
    CGmap,
    Parallax,
    CMapKey,
    ValidationProvider,
      /*SomeComponent: () => {
          return new Promise((resolve, reject) => {
              let script = document.createElement('script');
              script.onload = () => {
                  resolve(import(someComponent))
              };
              script.async = true;
              script.src = 'https://maps.googleapis.com/maps/api/js?key=APIKEY&libraries=places';
                  document.head.appendChild(script)
          })
      }*/
  },
  data(){
    return {
      product: {},
      error: false,
       /* markerLocations: [ //tmp for testing
            {
                lat: 59.88893689676585,
                lng: 82.265625
            },
            {
                lat: 37.71859032558816,
                lng: 71.71875
            },
            {
                lat: 45.583289756006316,
                lng: 14.0625
            },
            {
                lat: 38.272688535980976,
                lng: 35.859375
            }
        ],
       */
      images: {
        sheep: '//a.storyblok.com/f/56947/2407x3000/b068df88dd/12-sheep-shearing.jpg',
        animalWelfare: '//a.storyblok.com/f/56947/3842x2160/8a75818094/hand-shadow.jpg',
        environmentalWelfare: '//a.storyblok.com/f/56947/5090x2144/639b5b2af0/environmental.jpg',
        whoMadeYourClothes: '//a.storyblok.com/f/56947/3840x2138/5a2a5d8fa5/factory2.jpg',
        material: {
            default:[
              '//a.storyblok.com/f/56947/5006x2161/c3b1ef5675/materials.jpg'
            ],
            wool: [
                '//a.storyblok.com/f/56947/5504x8256/207dcc0266/baregafarm_5375.jpg',
            ],
            cotton: [
                '//a.storyblok.com/f/56947/1667x2500/932578c8ca/at_cotton_1836.jpg',
            ],
            linen: [
                '//a.storyblok.com/f/56947/1697x2560/9810d2a576/a-t-30.jpg'
            ],
            viscose: [
                '//a.storyblok.com/f/56947/1562x1971/17764ba389/4157_01.jpg'
            ],
            tencel: [
                '//a.storyblok.com/f/56947/2610x1080/a6fe0c44b3/lyocell-modal-fabric-sustainability-botanic-origin-2610x1080.jpg'
            ]
        },
      },

      socialShare: {
        twitter: 'https://twitter.com/intent/tweet?source=' + window.location.origin + this.$route.fullPath + '&text=see my Native Land Provenance Journey',
        facebook: 'https://www.facebook.com/sharer.php?u=' + window.location.origin + this.$route.fullPath
      },

      mapMarkerIcon:{
          //url : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODggMTQ0KSI+PHBhdGggZD0iTS0yNzItMTQ0Yy02LjYyNywwLTEyLDUuMzczLTEyLDEyczEwLDIwLDEyLDIwczEyLTEzLjM3MywxMi0yMFMtMjY1LjM3My0xNDQtMjcyLTE0NHogTS0yNzItMTI0Yy00LjQxMiwwLTgtMy41OS04LTggICBzMy41ODgtOCw4LThzOCwzLjU5LDgsOFMtMjY3LjU4OC0xMjQtMjcyLTEyNHoiLz48L2c+PC9zdmc+'
      },

        /*testMarkers: [
            {
                position: { lat: 59.88893689676585, lng: 82.265625 },
                icon: {url : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODggMTQ0KSI+PHBhdGggZD0iTS0yNzItMTQ0Yy02LjYyNywwLTEyLDUuMzczLTEyLDEyczEwLDIwLDEyLDIwczEyLTEzLjM3MywxMi0yMFMtMjY1LjM3My0xNDQtMjcyLTE0NHogTS0yNzItMTI0Yy00LjQxMiwwLTgtMy41OS04LTggICBzMy41ODgtOCw4LThzOCwzLjU5LDgsOFMtMjY3LjU4OC0xMjQtMjcyLTEyNHoiLz48L2c+PC9zdmc+'},
                infoText: 'Marker 1'
            },
            {
                position: { lat: 37.71859032558816, lng: 71.71875 },
                icon: {url : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODggMTQ0KSI+PHBhdGggZD0iTS0yNzItMTQ0Yy02LjYyNywwLTEyLDUuMzczLTEyLDEyczEwLDIwLDEyLDIwczEyLTEzLjM3MywxMi0yMFMtMjY1LjM3My0xNDQtMjcyLTE0NHogTS0yNzItMTI0Yy00LjQxMiwwLTgtMy41OS04LTggICBzMy41ODgtOCw4LThzOCwzLjU5LDgsOFMtMjY3LjU4OC0xMjQtMjcyLTEyNHoiLz48L2c+PC9zdmc+'},
                infoText: 'Marker 2'
            },
            {
                position: { lat: 45.583289756006316, lng: 14.0625 },
                icon: {url : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODggMTQ0KSI+PHBhdGggZD0iTS0yNzItMTQ0Yy02LjYyNywwLTEyLDUuMzczLTEyLDEyczEwLDIwLDEyLDIwczEyLTEzLjM3MywxMi0yMFMtMjY1LjM3My0xNDQtMjcyLTE0NHogTS0yNzItMTI0Yy00LjQxMiwwLTgtMy41OS04LTggICBzMy41ODgtOCw4LThzOCwzLjU5LDgsOFMtMjY3LjU4OC0xMjQtMjcyLTEyNHoiLz48L2c+PC9zdmc+'},
                infoText: 'Marker 3'
            },
            {
                position: { lat: 38.272688535980976, lng: 35.859375 },
                icon: {url : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODggMTQ0KSI+PHBhdGggZD0iTS0yNzItMTQ0Yy02LjYyNywwLTEyLDUuMzczLTEyLDEyczEwLDIwLDEyLDIwczEyLTEzLjM3MywxMi0yMFMtMjY1LjM3My0xNDQtMjcyLTE0NHogTS0yNzItMTI0Yy00LjQxMiwwLTgtMy41OS04LTggICBzMy41ODgtOCw4LThzOCwzLjU5LDgsOFMtMjY3LjU4OC0xMjQtMjcyLTEyNHoiLz48L2c+PC9zdmc+'},
                infoText: 'Marker 4'
            },
        ],*/
        locations: {
            manufacturerLocation : {
                value: '',
                mapKeyLabel: 'Material Manufacturer',
                position: {},
                color: 'darkest',
                icon: {
                   // url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiLz48L2c+PC9zdmc+\n'
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIxIDIxIj4KICA8ZyBpZD0iRWxsaXBzZV82OSIgZGF0YS1uYW1lPSJFbGxpcHNlIDY5IiBzdHJva2U9IiM3MDcwNzAiIHN0cm9rZS13aWR0aD0iMSI+CiAgICA8Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iMTAuNSIgc3Ryb2tlPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iMTAiIGZpbGw9Im5vbmUiLz4KICA8L2c+Cjwvc3ZnPgo='
                },
        },
            material1MillLocation : {
                value: '',
                mapKeyLabel: 'Material Mill',
                position: {},
                color: 'darker',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIxIDIxIj4KICA8ZyBpZD0iRWxsaXBzZV83MCIgZGF0YS1uYW1lPSJFbGxpcHNlIDcwIiBmaWxsPSIjMzMzMTMxIiBzdHJva2U9IiM3MDcwNzAiIHN0cm9rZS13aWR0aD0iMSI+CiAgICA8Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iMTAuNSIgc3Ryb2tlPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iMTAiIGZpbGw9Im5vbmUiLz4KICA8L2c+Cjwvc3ZnPgo='
                },
            },
            material1SpinnerLocation : {
                value: '',
                mapKeyLabel: 'Material Spinner',
                position: {},
                color: 'dark',
                icon: {
                    url : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiM1OTU5NTkiLz48L2c+PC9zdmc+\n'
                },
            },
            material2MillLocation : {
                value: '',
                mapKeyLabel: 'Material Mill',
                position: {},
                color: 'darker',
                icon: {
                    url : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIxIDIxIj4KICA8ZyBpZD0iRWxsaXBzZV83MCIgZGF0YS1uYW1lPSJFbGxpcHNlIDcwIiBmaWxsPSIjMzMzMTMxIiBzdHJva2U9IiM3MDcwNzAiIHN0cm9rZS13aWR0aD0iMSI+CiAgICA8Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iMTAuNSIgc3Ryb2tlPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iMTAiIGZpbGw9Im5vbmUiLz4KICA8L2c+Cjwvc3ZnPgo='
                },
            },
            material2SpinnerLocation : {
                value: '',
                mapKeyLabel: 'Material Spinner',
                position: {},
                color: 'dark',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiM1OTU5NTkiLz48L2c+PC9zdmc+'
                },
            },

            material1ComponentASourceLocation:{

                value: '',
                mapKeyLabel: 'Material Component Source',
                position: {},
                color: 'light',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiM4MjgyODIiLz48L2c+PC9zdmc+\n'
                },
            },
            material2ComponentASourceLocation:{
                value: '',
                mapKeyLabel: 'Material Component Source',
                position: {},
                color: 'light',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiM4MjgyODIiLz48L2c+PC9zdmc+\n'
                },
            },
            btn1ManufacturerLocation : {
                value: '',
                mapKeyLabel: 'Button Manufacturer',
                position: {},
                color: 'lighter',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiNiYWJhYmEiLz48L2c+PC9zdmc+\n'
                },
            },
            btn2ManufacturerLocation : {
                value: '',
                mapKeyLabel: 'Button Manufacturer',
                position: {},
                color: 'lighter',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiNiYWJhYmEiLz48L2c+PC9zdmc+\n'
                },
            },
            btn3ManufacturerLocation : {
                value: '',
                mapKeyLabel: 'Button Manufacturer',
                position: {},
                color: 'lighter',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiNiYWJhYmEiLz48L2c+PC9zdmc+\n'
                },
            },

            button1ComponentASourceLocation: {
                value: '',
                mapKeyLabel: 'Button Component Source',
                position: {},
                color: 'lightest',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiNlMGUwZTAiLz48L2c+PC9zdmc+\n'
                },
            },

            button2ComponentASourceLocation: {
                value: '',
                mapKeyLabel: 'Button Component Source',
                position: {},
                color: 'lightest',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiNlMGUwZTAiLz48L2c+PC9zdmc+\n'
                },
            },

            button3ComponentASourceLocation: {
                value: '',
                mapKeyLabel: 'Button Component Source',
                position: {},
                color: 'lightest',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNi42NjciIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNi42NjcgNDAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMC4yNSAtMzYpIj48cGF0aCBkPSJNNDMuNTgzLDM2YTEzLjM0LDEzLjM0LDAsMCwwLTExLjQsMjAuMjUzTDQzLjU4Myw3NmwxMS40LTE5Ljc0N0ExMy4zNCwxMy4zNCwwLDAsMCw0My41ODMsMzZabTAsMTguMjY4YTQuNTIzLDQuNTIzLDAsMSwxLDMuMjA1LTEuMzI1LDQuNTMsNC41MywwLDAsMS0zLjIwNSwxLjMyNVoiIGZpbGw9IiNlMGUwZTAiLz48L2c+PC9zdmc+\n'
                },
            },
        },
        coordsReady: false,
    };
  },
  created(){
    if(this.getThngIdParam()){
      this.getProduct();
    }
    else{
        console.log('No thngId found');
    }
  },

  mounted(){
      //console.log(1);
      if(this.getThngIdParam()){
          this.getProduct();
      }


  },
  methods: {
    async getProduct(){
      try {
        const response = await axios.get(`./.netlify/functions/evrythngFetchProduct?id=${this.$route.params.id}`);
        let product = await response.data;

        this.setLocationValues(product);

        this.modifyLocationsWithCoords();
        this.product = this.buildProductData(product);
        let a = 2;

      } catch (e) {
          //@TODO needs better error handling, check vue 404 routes
        this.error = true;
        this.$router.push('/error');
        // console.error('e');
        // console.error(e);
      }
    },


      async fetchCoords(address, key){
          //console.log('key - ' + key);
          //console.log('address - ' + address);
          let coords = null;
          if(typeof address === 'string'){
              if(address.trim() !== ''){
                  let url = `./.netlify/functions/hereGeocodeGetCoordsWithAddress?address=${encodeURI(address)}`;
                  console.log('url - ' + url);

                  try {
                      const coordsResponse = await axios.get(url);
                      coords = await coordsResponse.data;
                  } catch(e) {
                      console.error('e');
                      console.error(e);
                  }
              }
          }
          return coords;
      },

      async modifyLocationsWithCoords(){

        const fields = this.locations;
        let position = {};
        let latLng = {};

        for (let key in fields){
          if(fields.hasOwnProperty(key)){
            if(this.locations[key]['value']){
              const coords = await this.fetchCoords(this.locations[key]['value'], key);
              //console.log(coords);
              if(typeof coords !== "undefined"){
                  if(coords){
                      position = {lat: parseFloat(coords.lat), lng: parseFloat(coords.lng)};
                      this.locations[key]['position'] = position;
                  }
              }
            }
          }
        }
        this.coordsReady = true;
      },

      setLocationValues(product){
          const fields = this.locations;
          for (let key in fields){
              if(fields.hasOwnProperty(key)){
                  this.locations[key]['value'] = product.customFields[key];
              }
          }
      },

      getValidLocations(){
          const fields = this.locations;
          let validFields = {};

          for (let key in fields){
              if(fields.hasOwnProperty(key)){
                  if(fields[key].hasOwnProperty('value')){
                      if(typeof fields[key]['value'] !== 'undefined') {
                          if (fields[key]['value'] !== '') {
                              validFields[key] = fields[key];
                          }
                      }
                  }
              }
          }
          return validFields;
      },

    findMaterialName(materials, prodMaterial){

        let searchStrings = prodMaterial.split(" ");

        if(searchStrings.length > 0){
            for(const k in searchStrings){
                if(Object.prototype.hasOwnProperty.call(searchStrings, k)){
                    let searchStr = searchStrings[k].toLowerCase().trim();
                    if (materials.indexOf(searchStr) > -1) {
                        return searchStr;
                    }
                }
            }
        }

        for(const material of materials){
            if(prodMaterial.indexOf(material) > -1){
                return material;
            }
        }

        return 'default';
    },

    getMaterialImage(material){
        if(material) {
            let keys = Object.keys(this.images.material);
            let name = this.findMaterialName(keys, material);
            /*if (material.indexOf(name) > -1) {*/
                return this.images.material[name][0];
            //}
        }
        return this.images.material.default[0];
    },

    buildImages(){
        let merged = {};
        merged = {
            ...{ animalWelfare: this.images.animalWelfare },
            ...{ environmentalWelfare: this.images.environmentalWelfare },
            ...{ whoMadeYourClothes: this.images.whoMadeYourClothes },
        };
        return merged;
    },
    buildProductData(product){
      return {
          id: product.id,
          name: product.customFields.shortDescription,
          description: product.customFields.section1CopyDescription,
          colorDescription: product.customFields.colorDescription,
          //manufacturerLocation: product.customFields.manufacturerLocation,
          size: product.customFields.size,
          brand: product.brand,
          animalWelfare: product.customFields.animalWelfare,
          environmentalWelfare: product.customFields.environmentalWelfare,
          whoMadeYourClothes: product.customFields.whoMadeYourClothes,
          images: {
              ...this.buildImages(), ...{material: this.getMaterialImage(product.customFields.material1ComponentA)},
          },
          material: product.customFields.material1ComponentA,
          whyItMatters: [
              product.customFields.whyItMattersStat1,
              product.customFields.whyItMattersStat2,
              product.customFields.whyItMattersStat3
          ],
          provenanceJourney: [
              product.customFields.section4aProvenanceJourney,
              product.customFields.section4bProvenanceJourney,
              product.customFields.section4cProvenanceJourney,
              product.customFields.section4dProvenanceJourney,
              product.customFields.section4eProvenanceJourney,
              product.customFields.section4fProvenanceJourney,
              product.customFields.section4gProvenanceJourney,
              product.customFields.section4hProvenanceJourney
          ],

          locations: this.getValidLocations(),
      };
    },
    getThngIdParam(){
      if(Object.prototype.hasOwnProperty.call(this.$route, 'params')){
        if(typeof this.$route.params !== 'undefined'){
          //console.log('this.$route.params:');
          //console.log(this.$route.params);
          if(Object.keys(this.$route.params).length > 0){
            if(Object.prototype.hasOwnProperty.call(this.$route.params, 'id')){
              if(this.$route.params.id !== ''){
                return this.$route.params.id;
              }
            }
          }
        }
      }
      return null;
    },
    isValidProduct(product){
      if(typeof product !== 'undefined'){
        if(Object.keys(product).length > 0) {
          return true;
        }
      }
      return false;
    },
  },
    computed:{

    }
};
</script>
