import Vue from 'vue'

import CTA from '../components/CTA.vue'
import Socials from '../components/Socials.vue'

Vue.component('socials', Socials)
Vue.component('cta', CTA)

/*
 |--------------------------------------------------------------------------
 | Vue Scroll
 |--------------------------------------------------------------------------
 */

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
    offset: -67,
    duration: 200
})

/*
 |--------------------------------------------------------------------------
 | Directives
 |--------------------------------------------------------------------------
 */ 

Vue.directive('loading', {
    inserted (el, binding, vnode) {
        let loadingMask = document.createElement('div')
        loadingMask.className = 'loading-mask'
        el.appendChild(loadingMask)
    },
    update (el, binding, vnode) {
        let loadingMask = el.getElementsByClassName('loading-mask')[el.getElementsByClassName('loading-mask').length - 1] // Get the last div in the node
        if (binding.value) {
            loadingMask.className += ' is-active'
        } else {
            loadingMask.className = 'loading-mask'
        }
    }
})
