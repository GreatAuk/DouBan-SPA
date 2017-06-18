import * as types from  './mutation-types.js'

const mutations={
    [types.LOADING_STATUS](state,loadStatus){
        state.loadStatus=loadStatus;
    },
    [types.NET_STATUS](state,netStatus) {
        state.netStatus=netStatus;
    }
}

export default mutations;
