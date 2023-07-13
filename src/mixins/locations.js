
export default {
    methods: {

        getValidLocations() {
            const fields = this.locations;
            let validFields = {};

            for (let key in fields) {
                if (fields.hasOwnProperty(key)) {
                    if (fields[key].hasOwnProperty('value')) {
                        if (typeof fields[key]['value'] !== 'undefined') {
                            if (fields[key]['value'] !== '') {
                                validFields[key] = fields[key];
                            }
                        }
                    }
                }
            }
            return validFields;
        },
    }
}
