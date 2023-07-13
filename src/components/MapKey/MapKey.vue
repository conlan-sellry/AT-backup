<template>

    <div class="c-MapKey">
        <div class="key-col">
            <div
                    v-for="(item, idx) in getMapKeyLabels().slice(0,3)"
                    :key="`col-1-${idx}`"

            >
                <span class="c-MapKey__keyColWrap">
                     <span :class="`key-color key-color--${item.color}`">
                        <!--{{ item.color }}-->
                    </span>
                </span>

                <span :class="`label`">
                    {{ item.label }}
                </span>
            </div>
        </div>


        <div class="key-col">
            <div
                    v-for="(item, idx2) in getMapKeyLabels().slice(3,6)"
                    :key="`col-2-${idx2}`"

            >
            <span class="c-MapKey__keyColWrap">
                <span :class="`key-color key-color--${item.color}`">
                <!-- {{ item.color }}-->
                </span>
            </span>
                <span :class="`label`">
                {{ item.label }}
                </span>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        props: {
            locations: {
                type: Object,
                default: () => {}
            },
            mapKeys: {
                type: Array,
                default: () => []
            }
        },

        mounted(){
            //console.log(this.mapKeys);
            //this.getMapKeyLabels();
        },

        methods: {

            getMapKeyLabels(){
                const locs = this.locations;
                let mapKeyLabels = [];
                let uniqueLabels = null;

                for (const key in locs){



                    let builtObj = {};
                    if(locs.hasOwnProperty(key)){

                        if(locs[key].hasOwnProperty('position')){
                            if(locs[key]['position'].hasOwnProperty('lat') && locs[key]['position'].hasOwnProperty('lng')){

                                if(!isNaN(locs[key]['position']['lat']) && !isNaN(locs[key]['position']['lng'])){

                                    if(locs[key].hasOwnProperty('mapKeyLabel')){
                                        let label = locs[key]['mapKeyLabel'];
                                        if(typeof label === 'string'){
                                            if(label.trim() !== ''){
                                                builtObj['label'] = label;
                                            }
                                        }
                                    }
                                    if(locs[key].hasOwnProperty('color')){
                                        let color = locs[key]['color'];
                                        if(typeof color === 'string'){
                                            if(color.trim() !== ''){
                                                builtObj['color'] = color;
                                            }
                                        }
                                    }
                                    mapKeyLabels.push(builtObj);

                                }
                            }

                        }

                    }
                }

                uniqueLabels = this.unique(mapKeyLabels, 'label');
                return uniqueLabels;
            },

             unique(array, propertyName) {
                return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
             }
        }
    }
</script>
<style lang="scss" src="./MapKey.scss"></style>
