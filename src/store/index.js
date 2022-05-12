import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
 

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        todos:[
            {
                id:'5bdoutr6hac',
                description: 'Clear my room',
                completed: false,
            },
            {
                id:'s26144e78t9',
                description: 'Clean the kitchen and wash the dishes',
                completed: true,
            },
            {
                id:'hk7occrmf0r',
                description: 'Help sola with her homework',
                completed: false,
            },
        ],
    },
    getters,
    mutations,
    actions
});

export default store;